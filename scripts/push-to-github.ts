import { getUncachableGitHubClient } from "../server/github";
import * as fs from "fs";
import * as path from "path";

const REPO_NAME = "musajil";
const REPO_DESCRIPTION = "Musajil — Enterprise-grade event management platform with guest-first registration, real-time operations command center, and predictive analytics.";

const IGNORE_DIRS = new Set(["node_modules", "dist", ".git", ".cache", ".local", ".config", ".upm", "server/public", ".replit"]);
const IGNORE_FILES = new Set([".DS_Store", "replit.nix", ".replit", "replit_zip_error_log.txt"]);

function getAllFiles(dir: string, base: string = ""): { path: string; fullPath: string }[] {
  const results: { path: string; fullPath: string }[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const relPath = base ? `${base}/${entry.name}` : entry.name;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(relPath) || IGNORE_DIRS.has(entry.name)) continue;
      results.push(...getAllFiles(fullPath, relPath));
    } else {
      if (IGNORE_FILES.has(entry.name)) continue;
      if (entry.name.endsWith(".tar.gz")) continue;
      results.push({ path: relPath, fullPath });
    }
  }
  return results;
}

function isBinary(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  const binaryExts = new Set([".png", ".jpg", ".jpeg", ".gif", ".ico", ".woff", ".woff2", ".ttf", ".eot", ".mp4", ".webm", ".zip", ".tar", ".gz"]);
  return binaryExts.has(ext);
}

async function main() {
  const octokit = await getUncachableGitHubClient();

  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);

  let repo;
  try {
    const { data } = await octokit.repos.get({ owner: user.login, repo: REPO_NAME });
    repo = data;
    console.log(`Repository ${user.login}/${REPO_NAME} already exists`);
  } catch {
    const { data } = await octokit.repos.createForAuthenticatedUser({
      name: REPO_NAME,
      description: REPO_DESCRIPTION,
      private: false,
      auto_init: true,
    });
    repo = data;
    console.log(`Created repository: ${repo.html_url}`);
  }

  await new Promise(resolve => setTimeout(resolve, 2000));

  let mainSha: string;
  try {
    const { data: ref } = await octokit.git.getRef({ owner: user.login, repo: REPO_NAME, ref: "heads/main" });
    mainSha = ref.object.sha;
  } catch {
    const { data: ref } = await octokit.git.getRef({ owner: user.login, repo: REPO_NAME, ref: "heads/master" });
    mainSha = ref.object.sha;
  }
  console.log(`Current HEAD: ${mainSha}`);

  const { data: baseCommit } = await octokit.git.getCommit({ owner: user.login, repo: REPO_NAME, commit_sha: mainSha });

  const projectDir = process.cwd();
  const files = getAllFiles(projectDir);
  console.log(`Found ${files.length} files to push`);

  const treeItems: any[] = [];
  for (const file of files) {
    const binary = isBinary(file.fullPath);
    if (binary) {
      const content = fs.readFileSync(file.fullPath);
      const { data: blob } = await octokit.git.createBlob({
        owner: user.login,
        repo: REPO_NAME,
        content: content.toString("base64"),
        encoding: "base64",
      });
      treeItems.push({ path: file.path, mode: "100644" as const, type: "blob" as const, sha: blob.sha });
    } else {
      const content = fs.readFileSync(file.fullPath, "utf-8");
      const { data: blob } = await octokit.git.createBlob({
        owner: user.login,
        repo: REPO_NAME,
        content,
        encoding: "utf-8",
      });
      treeItems.push({ path: file.path, mode: "100644" as const, type: "blob" as const, sha: blob.sha });
    }
  }

  console.log("Creating tree...");
  const { data: tree } = await octokit.git.createTree({
    owner: user.login,
    repo: REPO_NAME,
    tree: treeItems,
  });

  console.log("Creating commit...");
  const { data: commit } = await octokit.git.createCommit({
    owner: user.login,
    repo: REPO_NAME,
    message: "Initial commit: Musajil event management platform",
    tree: tree.sha,
    parents: [mainSha],
  });

  let branch = "main";
  try {
    await octokit.git.updateRef({ owner: user.login, repo: REPO_NAME, ref: "heads/main", sha: commit.sha });
  } catch {
    branch = "master";
    await octokit.git.updateRef({ owner: user.login, repo: REPO_NAME, ref: "heads/master", sha: commit.sha });
  }

  console.log(`\nPushed to: https://github.com/${user.login}/${REPO_NAME}`);
  console.log(`Branch: ${branch}`);
  console.log(`Commit: ${commit.sha}`);
}

main().catch(console.error);
