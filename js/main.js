document.addEventListener('DOMContentLoaded', async () => {
    try {

        const terminal = new Terminal();
        const ai = new AI(terminal);
        const commandProcessor = new CommandProcessor(terminal, ai);
        

        terminal.setCommandProcessor(commandProcessor);


        await ai.initialize();


        const commandInput = document.getElementById('command-input');
        commandInput.focus();
        document.addEventListener('click', () => {
            commandInput.focus();
        });

        console.log('System successfully initialized');
    } catch (error) {
        console.error('Initialization error:', error);
        document.getElementById('terminal').innerHTML = `
            <div class="output-line error">System initialization failed: ${error.message}</div>
        `;
    }
}); 