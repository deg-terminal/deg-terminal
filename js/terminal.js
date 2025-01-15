class Terminal {
    constructor() {
        this.element = document.getElementById('terminal');
        this.input = document.getElementById('command-input');
        if (!this.element || !this.input) {
            throw new Error('Failed to find required terminal elements');
        }
        this.commandProcessor = null;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.setupInput();
    }

    setupInput() {

        this.input.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter' && this.input.value.trim()) {
                e.preventDefault(); 
                const command = this.input.value.trim();
                this.input.value = '';
                await this.processInput(command);
            }

            else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    this.input.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
                }
            }
            else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.input.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
                } else if (this.historyIndex === 0) {
                    this.historyIndex = -1;
                    this.input.value = '';
                }
            }
        });

        // Автофокус на input
        this.input.focus();
        document.addEventListener('click', () => {
            this.input.focus();
        });
    }

    async processInput(command) {
        if (!this.commandProcessor) {
            await this.print('Error: CommandProcessor not initialized', 'error');
            return;
        }

        this.commandHistory.unshift(command);
        this.historyIndex = -1;


        await this.print(`>> ${command}`, 'input');
        
        try {

            await this.commandProcessor.processCommand(command);
        } catch (error) {
            await this.print(`Error executing command: ${error.message}`, 'error');
        }
    }

    async print(text, type = '') {
        const line = document.createElement('div');
        line.className = `output-line ${type}`;
        line.textContent = text;
        this.element.appendChild(line);
        this.element.scrollTop = this.element.scrollHeight;
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    clear() {
        this.element.innerHTML = '';
    }

    async simulateLoading(time = 1000) {
        const loader = document.createElement('div');
        loader.className = 'output-line loading';
        loader.textContent = 'Processing';
        this.element.appendChild(loader);
        await new Promise(resolve => setTimeout(resolve, time));
        loader.remove();
    }

    setCommandProcessor(processor) {
        this.commandProcessor = processor;
    }

    destroy() {
        if (this.commandProcessor && this.commandProcessor.ai) {
            this.commandProcessor.ai.stopPeriodicMessages();
        }
    }
} 