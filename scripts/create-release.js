const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Чтение package.json
const packagePath = path.join(__dirname, '..', 'package.json');
const package = require(packagePath);
const version = package.version;

// Получаем изменения с последнего тега
const getLastTag = () => {
  try {
    return execSync('git describe --tags --abbrev=0').toString().trim();
  } catch (error) {
    return null;
  }
};

const getChanges = (lastTag) => {
  try {
    const command = lastTag
      ? `git log ${lastTag}..HEAD --pretty=format:"- %s"`
      : 'git log --pretty=format:"- %s"';
    return execSync(command).toString().trim();
  } catch (error) {
    return '';
  }
};

// Создаем релиз
const createRelease = async () => {
  const lastTag = getLastTag();
  const changes = getChanges(lastTag);
  
  // Создаем ветку релиза
  try {
    execSync(`git checkout -b release/v${version}`);
    console.log(`Created release branch: release/v${version}`);
  } catch (error) {
    console.error('Failed to create release branch:', error.message);
    process.exit(1);
  }

  // Создаем файл с описанием релиза
  const releaseNotesPath = path.join(__dirname, '..', 'RELEASE_NOTES.md');
  const releaseNotes = `# Release v${version}

## Changes
${changes}

## Installation
\`\`\`bash
npm install
npm run build
\`\`\`

## Deployment
1. Merge \`release/v${version}\` into \`main\`
2. Tag the merge commit with \`v${version}\`
3. Push tags to remote
`;

  fs.writeFileSync(releaseNotesPath, releaseNotes);
  console.log('Created release notes');

  // Добавляем файл в Git
  try {
    execSync('git add RELEASE_NOTES.md');
    execSync(`git commit -m "chore: prepare release v${version}"`);
    console.log('Committed release notes');
  } catch (error) {
    console.error('Failed to commit release notes:', error.message);
  }
};

createRelease().catch(console.error); 