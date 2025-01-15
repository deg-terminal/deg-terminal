const CONFIG = {
    accessLevels: {
        0: {
            name: "Guest",
            color: "#33ff33",
            commands: ["help", "login", "about", "clear", "ca", "telegram", "xcom", "status"]
        },
        1: {
            name: "APE",
            color: "#33ff33",
            commands: ["decrypt"]
        },
        2: {
            name: "DIAMOND HANDS",
            color: "#33ff33",
            commands: ["analyze"]
        },
    },
    
    responses: {
        boot: [
            "Initializing system...",
            "Loading core modules...",
            "System ready."
        ],
        
        errors: {
            accessDenied: "Access denied. Insufficient access level.",
            invalidCommand: "Unknown command. Use 'help' to see available commands.",
            systemError: "Critical system error. Reboot required."
        },

    }
}; 