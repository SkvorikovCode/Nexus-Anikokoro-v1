const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Получаем тип обновления версии из аргументов командной строки
const versionType = process.argv[2] || 'patch';

// Чтение package.json
const packagePath = path.join(__dirname, '..', 'package.json');
const package = require(packagePath);

// Разбиваем текущую версию на компоненты
let [major, minor, patch] = package.version.split('.').map(Number);

// Обновляем версию в зависимости от типа
switch (versionType) {
  case 'major':
    major += 1;
    minor = 0;
    patch = 0;
    break;
  case 'minor':
    minor += 1;
    patch = 0;
    break;
  case 'patch':
  default:
    patch += 1;
    break;
}

// Формируем новую версию
const newVersion = `${major}.${minor}.${patch}`;
package.version = newVersion;

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

// Обновляем CHANGELOG.md
const updateChangelog = (version, changes) => {
  const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
  const date = new Date().toISOString().split('T')[0];
  const newEntry = `
## [${version}] - ${date}

${changes || 'No significant changes.'}
`;

  let changelog = '';
  try {
    changelog = fs.readFileSync(changelogPath, 'utf8');
  } catch (error) {
    changelog = '# Changelog\n\nAll notable changes to this project will be documented in this file.\n';
  }

  // Добавляем новую запись после заголовка
  const lines = changelog.split('\n');
  const insertIndex = lines.findIndex(line => line.startsWith('## [')) || 2;
  lines.splice(insertIndex, 0, newEntry);
  
  fs.writeFileSync(changelogPath, lines.join('\n'));
  console.log('Changelog updated');
};

// Получаем изменения и обновляем CHANGELOG
const lastTag = getLastTag();
const changes = getChanges(lastTag);
updateChangelog(newVersion, changes);

// Записываем обновленный package.json
fs.writeFileSync(packagePath, JSON.stringify(package, null, 2) + '\n');
console.log(`Version bumped to ${package.version}`);

// Создаем тег версии
try {
  execSync(`git tag v${package.version}`);
  console.log(`Created git tag: v${package.version}`);
} catch (error) {
  console.error('Failed to create git tag:', error.message);
}

// Добавляем CHANGELOG.md в индекс Git
try {
  execSync('git add CHANGELOG.md');
} catch (error) {
  console.error('Failed to add CHANGELOG.md:', error.message);
} 