class CommandProcessor {
    constructor(terminal, ai) {
        this.terminal = terminal;
        this.ai = ai;
        this.accessLevel = 0;
        this.commandHistory = [];
        this.historyIndex = -1;
    }

    isCommandAvailable(cmd) {
        for(let level = 0; level <= this.accessLevel; level++) {
            if(CONFIG.accessLevels[level].commands.includes(cmd)) {
                return true;
            }
        }
        return false;
    }

    async processCommand(command) {
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;

        const [cmd, ...args] = command.toLowerCase().trim().split(' ');

        if (!this.isCommandAvailable(cmd)) {
            await this.terminal.print(CONFIG.responses.errors.accessDenied, 'error');
            return;
        }

        try {
            switch(cmd) {
                case 'help':
                    await this.showHelp();
                    break;
                case 'login':
                    await this.login(args[0]);
                    break;
                case 'status':
                    await this.showStatus();
                    break;
                case 'decrypt':
                    await this.decryptData(args.join(' '));
                    break;
                case 'clear':
                    this.terminal.clear();
                    break;
                case 'about':
                    await this.showAbout();
                    break;
                case 'analyze':
                    await this.analyzeSystem();
                    break;
                case 'ca':
                    await this.showCA();
                    break;
                case 'telegram':
                    await this.showTelegram();
                    break;
                case 'xcom':
                    await this.showXcom();
                    break;
                default:
                    await this.terminal.print(CONFIG.responses.errors.invalidCommand, 'error');
            }
        } catch (error) {
            await this.terminal.print(`Command execution error: ${error.message}`, 'error');
        }
    }

    async showHelp() {
        await this.terminal.print('Available commands:', 'system');
        for(let level = 0; level <= this.accessLevel; level++) {
            const levelConfig = CONFIG.accessLevels[level];
            await this.terminal.print(`\nLevel ${level} - ${levelConfig.name}:`, levelConfig.color);
            for(const cmd of levelConfig.commands) {
                await this.terminal.print(`  ${cmd}`, levelConfig.color);
            }
        }
    }

    async login(password) {
        await this.terminal.print('Checking credentials...', 'system');
        await this.terminal.simulateLoading(2000);

        if(this.accessLevel >= 2) {
            await this.terminal.print('Maximum access level already achieved', 'warning');
            return;
        }

        const passwords = {
            0: 'rektd',
            1: 'wagmi',
        };

        if(password === passwords[this.accessLevel]) {
            this.accessLevel++;
            await this.terminal.print(`Access granted - Level ${this.accessLevel} (${CONFIG.accessLevels[this.accessLevel].name})`, 'success');
            this.ai.onAccessLevelChange(this.accessLevel);
        } else {
            await this.terminal.print('Invalid credentials', 'error');
            await this.terminal.simulateLoading(500);
            await this.terminal.print('\nTo get access credentials:', 'system');
            await this.terminal.print('1. Subscribe to t.me/deg_terminal', 'data');
            await this.terminal.print('2. Subscribe to x.com/deg_terminal', 'data');
            await this.terminal.print('3. Check pinned messages for password or secret key', 'data');
            await this.terminal.print('\nType "telegram" for all official channels', 'system');
        }
    }

    async showStatus() {
        await this.terminal.print('=== System Status ===', 'system');
        await this.terminal.print(`Access Level: ${this.accessLevel} (${CONFIG.accessLevels[this.accessLevel].name})`, 'data');
        await this.terminal.print(`Active Processes: ${Math.floor(Math.random() * 100)}`, 'data');
        await this.terminal.print(`System Load: ${Math.floor(Math.random() * 100)}%`, 'data');
        await this.terminal.print(`Quantum Coherence: ${(Math.random() * 100).toFixed(2)}%`, 'data');
    }

    async scanSystems() {
        await this.terminal.print('Initializing system scan...', 'system');
        await this.terminal.simulateLoading(2000);
        
        const systems = [
            'Quantum Core',
            'Neural Network',
            'Security System',
            'Quantum Memory',
            'Data Processor'
        ];

        for(const system of systems) {
            await this.terminal.simulateLoading(500);
            const status = Math.random() > 0.8 ? 'WARNING' : 'OK';
            const statusClass = status === 'OK' ? 'success' : 'warning';
            await this.terminal.print(`${system}: ${status}`, statusClass);
        }
    }

    async analyzeSystem() {
        await this.terminal.print('Starting deep system analysis...', 'system');
        await this.terminal.simulateLoading(3000);
        
        const metrics = [
            { name: 'Core Performance', value: `${(Math.random() * 100).toFixed(1)}%` },
            { name: 'Network Stability', value: `${(Math.random() * 100).toFixed(1)}%` },
            { name: 'Data Integrity', value: `${(Math.random() * 100).toFixed(1)}%` },
            { name: 'Quantum Entanglement', value: `${(Math.random() * 100).toFixed(1)}%` }
        ];

        for(const metric of metrics) {
            await this.terminal.print(`${metric.name}: ${metric.value}`, 'data');
        }
    }

    async decryptData(data) {
        if (!data) {
            await this.terminal.print('Please specify data to decrypt', 'error');
            return;
        }

        await this.terminal.print('Initializing quantum decryption module...', 'system');
        await this.terminal.simulateLoading(1000);

        // Показываем процесс дешифрования
        await this.terminal.print('\nAnalyzing encryption pattern...', 'system');
        await this.terminal.simulateLoading(500);
        
        const encryptionTypes = [
            'RSA-4096',
            'AES-256',
            'Quantum Encryption',
            'Neural Pattern',
            'Blockchain Hash'
        ];

        // Определяем "тип" шифрования
        const detectedType = encryptionTypes[Math.floor(Math.random() * encryptionTypes.length)];
        await this.terminal.print(`Detected encryption type: ${detectedType}`, 'data');
        await this.terminal.simulateLoading(800);

        // Показываем процесс перебора ключей
        await this.terminal.print('\nAttempting key sequence match:', 'system');
        for(let i = 0; i < 3; i++) {
            const fakeKey = Array(32).fill(0)
                .map(() => Math.floor(Math.random() * 16)
                .toString(16))
                .join('');
            await this.terminal.print(`Trying key: ${fakeKey}`, 'data');
            await this.terminal.simulateLoading(400);
            await this.terminal.print('Access denied', 'error');
        }

        // "Находим" правильный ключ
        const successKey = Array(32).fill(0)
            .map(() => Math.floor(Math.random() * 16)
            .toString(16))
            .join('');
        await this.terminal.print(`Trying key: ${successKey}`, 'data');
        await this.terminal.simulateLoading(600);
        await this.terminal.print('Access granted', 'success');

        // Процесс дешифрования
        await this.terminal.print('\nInitiating decryption sequence...', 'system');
        await this.terminal.simulateLoading(800);

        const progress = ['▒▒▒▒▒▒▒▒▒▒', '█▒▒▒▒▒▒▒▒▒', '██▒▒▒▒▒▒▒▒', '███▒▒▒▒▒▒▒', '████▒▒▒▒▒▒', 
                         '█████▒▒▒▒▒', '██████▒▒▒▒', '███████▒▒▒', '████████▒▒', '█████████▒', '██████████'];
        
        for(const bar of progress) {
            await this.terminal.print(`Decrypting: [${bar}] ${Math.floor((progress.indexOf(bar) + 1) * 10)}%`, 'system');
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Применяем различные алгоритмы дешифрования
        const algorithms = [
            'Applying quantum decoherence...',
            'Reversing neural patterns...',
            'Calculating hash collisions...',
            'Applying blockchain verification...',
            'Finalizing decryption matrix...'
        ];

        for(const algo of algorithms) {
            await this.terminal.print(algo, 'system');
            await this.terminal.simulateLoading(300);
        }

        const decrypted = this.complexDecrypt(data);
        await this.terminal.print('\nDecryption complete!', 'success');
        await this.terminal.print(`Original data: ${data}`, 'data');
        await this.terminal.print(`Decrypted data: ${decrypted}`, 'success');
        await this.terminal.print('\nDecryption successful. Data integrity verified.', 'success');
    }

    complexDecrypt(data) {
        const encryptedVersion = 'k.nf/-0SB2EP-cHbCjN3Uh';
        const originalVersion = 't.me/+0TA1FQ-bGcBkM2Vi';
        
        const normalizedInput = data.toLowerCase();
        const normalizedEncrypted = encryptedVersion.toLowerCase();
        const normalizedOriginal = originalVersion.toLowerCase();

        if (normalizedInput === normalizedEncrypted) {
            return originalVersion;
        }
        
        if (normalizedInput === normalizedOriginal) {
            return encryptedVersion;
        }

        return 'Invalid encrypted data. Please check your input.';
    }

    async showAbout() {
        const info = [
            "Deg Terminal v2.0",
            "Developed by: Alex Degen",
        ];

        for(const line of info) {
            await this.terminal.print(line, 'system');
        }
    }


    async showCA() {
        await this.terminal.print('=== Pump Fun Token Info ===', 'system');
        await this.terminal.simulateLoading(1000);
        
        const tokenInfo = [
            "Token Name: $DEGT  Deg Terminal",
            "Contract Address: comingsoon",
            "Network: Solana",
            "Total Supply: 1,000,000,000",
        ];

        for(const info of tokenInfo) {
            await this.terminal.print(info, 'data');
            await this.terminal.simulateLoading(300);
        }
    }

    async showTelegram() {
        await this.terminal.print('=== Telegram Channels ===', 'system');
        await this.terminal.simulateLoading(1000);
        
        const telegramLinks = [
            "Main Channel: @deg_terminal",
            "News Channel: @deg_terminal_news",
            "Community Chat: @deg_terminal_chat"
        ];

        for(const link of telegramLinks) {
            await this.terminal.print(link, 'data');
            await this.terminal.simulateLoading(300);
        }
    }

    async showXcom() {
        await this.terminal.print('=== X (Twitter) Accounts ===', 'system');
        await this.terminal.simulateLoading(1000);
        
        const xcomLinks = [
            "Main Account: @deg_terminal",
        ];

        for(const link of xcomLinks) {
            await this.terminal.print(link, 'data');
            await this.terminal.simulateLoading(300);
        }
    }
} 