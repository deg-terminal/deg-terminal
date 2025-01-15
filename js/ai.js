class AI {
    constructor(terminal) {
        this.terminal = terminal;
        this.accessLevel = 0;
        this.personality = {
            friendliness: 0.5,
            curiosity: 0.7,
            humor: 0.3
        };
        this.messageInterval = null;
        this.systemMessages = [
            "Ape Ape or apeing: when someone buys a token or NFT just after it is launched without a DYOR.",
            "Bagholder or hodler: A person who holds an assets in a time even if it the price goes down.",
            "Maximalist or maxi: Person that believes that a coin is the only crypto with value and worth supporting. ",
            "BTD or 'buy the dip': Used to encourage buying an asset at a low market price. ",
            "Cryptojacking or cryptomining: A type of hacking that mines crypto in other people's computers without knowing. ",
            "Cryptosis: Someone that doesn't stop talking about crypto and all the information they have about it.",
            "Diamond Hands: Heroes that hodl their coins through the worst moments. Good. ",
            "Paper Hands: Cowards that sell their coins at the first time of trouble. Bad. ",
            "DYOR or 'do your own research': Like it says, learn about a project before investing into it. ",
            "Flippening: Refers to ETH overtaking BTC ast the leader in terms of total market capitalization. ",
            "Flappening: Refers to LTC surpassing BCH in market capitalization.",
            "FOMO or 'fear of missing out': It refers to the fear that investors feel because of they may be missing out a pump. ",
            "FUD or 'fear, uncertainty, and doubt': Classic government technique to manipulate people to create a negative perception of something. ",
            "HODL or 'hold on for dear life': Refers to not sell a bought coin in the foreseeable future. "
        ];
    }

    async initialize() {
        for(const message of CONFIG.responses.boot) {
            await this.terminal.print(message, 'system');
            await this.terminal.simulateLoading(200);
        }
        
        await this.terminal.print("\nWelcome, normie. You've got basic access, but you're just lurking for now.\nType 'help' to view available commands.\n", 'system');
        
        this.startPeriodicMessages();
    }

    startPeriodicMessages() {
        this.messageInterval = setInterval(async () => {

            const delay = Math.floor(Math.random() * (30000 - 15000) + 15000);
            
            setTimeout(async () => {

                const message = this.systemMessages[Math.floor(Math.random() * this.systemMessages.length)];
                await this.terminal.print(message, 'system');
            }, delay);
        }, 15000);
    }

    stopPeriodicMessages() {
        if (this.messageInterval) {
            clearInterval(this.messageInterval);
            this.messageInterval = null;
        }
    }

    onAccessLevelChange(level) {
        this.accessLevel = level;
        this.personality.friendliness += 0.1;
    }
} 