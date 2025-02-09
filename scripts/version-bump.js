const fs = require('fs');
const path = require('path');

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
package.version = `${major}.${minor}.${patch}`;

// Записываем обновленный package.json
fs.writeFileSync(packagePath, JSON.stringify(package, null, 2) + '\n');

console.log(`Version bumped to ${package.version}`);

// Создаем тег версии
const { execSync } = require('child_process');
try {
  execSync(`git tag v${package.version}`);
  console.log(`Created git tag: v${package.version}`);
} catch (error) {
  console.error('Failed to create git tag:', error.message);
} 