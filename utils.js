import fs from 'fs';

const storeEnvVariable = (key, value) => {
    let envContent = '';
    try {
        envContent = fs.readFileSync('.env', 'utf8');
    } catch (error) {
    }
    const lines = envContent.split('\n');

    let keyExists = false;
    lines.forEach((line, index) => {
        if (line.startsWith(`${key}=`)) {
            lines[index] = `${key}=${value}`;
            keyExists = true;
        }
    });

    if (!keyExists) {
        lines.push(`${key}=${value}`);
    } 
    const newEnvContent = lines.join('\n');
    fs.writeFileSync('.env', newEnvContent);

    console.log(`Environment variable ${key} set in .env file.`);
};

export default storeEnvVariable;