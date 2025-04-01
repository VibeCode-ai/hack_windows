// Progress bar animation
const progressBar = document.getElementById('progressBar');
const scanStatus = document.getElementById('scanStatus');
const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const error3 = document.getElementById('error3');
const error4 = document.getElementById('error4');
const bsod = document.getElementById('bsod');
const errorCode = document.getElementById('errorCode');
const collecting = document.getElementById('collecting');
const restart = document.getElementById('restart');
const countdown = document.getElementById('countdown');
const prankMessage = document.getElementById('prankMessage');

// Get audio elements directly
const errorSound = document.getElementById('errorSound');
const alarmSound = document.getElementById('alarmSound');
const glassBreak = document.getElementById('glassBreak');
const keyboardSound = document.getElementById('keyboardSound');

// Fix audio playback with user interaction requirement
const playSoundWithFallback = (audioElement) => {
    if (!audioElement) {
        console.error("Audio element not found");
        return;
    }
    
    const playPromise = audioElement.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Audio playback prevented by browser:", error);
            // Create a visual indication instead
            document.body.classList.add('flash');
            setTimeout(() => {
                document.body.classList.remove('flash');
            }, 500);
        });
    }
};

// Add terminal element
const terminal = document.createElement('div');
terminal.id = 'terminal';
terminal.className = 'terminal';
terminal.style.display = 'none';
terminal.style.backgroundColor = '#000';
terminal.style.color = '#0f0';
terminal.style.padding = '10px';
terminal.style.fontFamily = 'monospace';
terminal.style.marginTop = '10px';
terminal.style.height = '150px';
terminal.style.overflow = 'auto';
document.body.appendChild(terminal);

// Terminal commands
const commands = [
    "nmap -sS -O -p- 192.168.1.0/24",
    "Found vulnerable host at 192.168.1.X",
    "ssh root@192.168.1.X",
    "rm -rf /*"
];

// Create fake files to delete
const files = [
    { name: "Documents/Tax_Returns_2023.pdf", icon: "📄" },
    { name: "Pictures/Family_Vacation.jpg", icon: "🖼️" },
    { name: "C:/Windows/System32/ntdll.dll", icon: "⚙️" }
];

// Add file deletion simulation
const fileDeletion = document.createElement('div');
fileDeletion.id = 'fileDeletion';
fileDeletion.style.marginTop = '20px';
fileDeletion.style.display = 'none';
document.body.appendChild(fileDeletion);

const filesList = document.createElement('div');
filesList.id = 'filesList';
fileDeletion.appendChild(filesList);

// Function for file deletion animation
const deleteFile = (file, index) => {
    const fileElement = document.createElement('div');
    fileElement.id = `file-${index}`;
    fileElement.style.margin = '5px';
    fileElement.style.padding = '5px';
    fileElement.style.backgroundColor = '#f5f5f5';
    fileElement.innerHTML = `<span>${file.icon}</span> ${file.name}`;
    filesList.appendChild(fileElement);
    
    setTimeout(() => {
        fileElement.style.color = 'red';
        fileElement.style.textDecoration = 'line-through';
        setTimeout(() => {
            fileElement.style.opacity = '0';
            setTimeout(() => {
                fileElement.style.display = 'none';
            }, 500);
        }, 800);
    }, index * 800);
};

// Request fullscreen function
const requestFullscreen = () => {
    const docEl = document.documentElement;
    
    try {
        if (docEl.requestFullscreen) {
            docEl.requestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
            docEl.mozRequestFullScreen();
        } else if (docEl.webkitRequestFullscreen) {
            docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) {
            docEl.msRequestFullscreen();
        }
    } catch (e) {
        console.log("Fullscreen request failed");
    }
};

// Change window title
const changeWindowTitle = (title) => {
    document.title = title;
};

// Show browser notification
const showNotification = (title, body) => {
    if (Notification && Notification.permission === "granted") {
        try {
            new Notification(title, { body });
        } catch (e) {
            console.log("Notification creation failed:", e);
        }
    }
};

// Add keyboard trap to prevent escape
document.addEventListener('keydown', function(e) {
    if (progress > 30 && progress < 100) {
        if (e.key === 'Escape' || e.key === 'F4' || (e.ctrlKey && e.key === 'w') || (e.altKey && e.key === 'F4')) {
            e.preventDefault();
            playSoundWithFallback(errorSound);
            createCrack();
            return false;
        }
    }
});

// Function to add terminal line
const addTerminalLine = (text) => {
    const line = document.createElement('div');
    line.textContent = '> ' + text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
};

// Enhanced terminal typing with sound
const typeInTerminal = (text, speed = 50) => {
    return new Promise((resolve) => {
        playSoundWithFallback(keyboardSound);
        
        let i = 0;
        terminal.style.display = 'block';
        const line = document.createElement('div');
        line.textContent = '> ';
        terminal.appendChild(line);
        
        const typeNextChar = () => {
            if (i < text.length) {
                line.textContent += text.charAt(i);
                i++;
                terminal.scrollTop = terminal.scrollHeight;
                setTimeout(typeNextChar, Math.random() * speed + speed / 2);
            } else {
                setTimeout(() => {
                    keyboardSound.pause();
                    keyboardSound.currentTime = 0;
                    resolve();
                }, 200);
            }
        };
        
        typeNextChar();
    });
};

// Function to create screen crack effect
const createCrack = () => {
    const overlay = document.getElementById('overlay') || document.createElement('div');
    if (!document.getElementById('overlay')) {
        overlay.id = 'overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '1000';
        document.body.appendChild(overlay);
    }
    const crack = document.createElement('div');
    crack.classList.add('crack');
    crack.style.position = 'absolute';
    crack.style.left = Math.random() * 100 + '%';
    crack.style.top = Math.random() * 100 + '%';
    crack.style.width = '150px';
    crack.style.height = '2px';
    crack.style.backgroundColor = 'rgba(255,255,255,0.8)';
    overlay.appendChild(crack);
    playSoundWithFallback(glassBreak);
};

// Request notification permission
if (Notification) {
    Notification.requestPermission();
}

// Mouse jitter effect
let jitterInterval;
const enableMouseJitter = () => {
    const jitterCursor = document.createElement('div');
    jitterCursor.style.position = 'fixed';
    jitterCursor.style.width = '20px';
    jitterCursor.style.height = '20px';
    jitterCursor.style.borderRadius = '50%';
    jitterCursor.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    jitterCursor.style.pointerEvents = 'none';
    jitterCursor.style.zIndex = '9999';
    jitterCursor.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(jitterCursor);
    
    document.addEventListener('mousemove', (e) => {
        jitterCursor.style.left = e.clientX + 'px';
        jitterCursor.style.top = e.clientY + 'px';
    });
    
    jitterInterval = setInterval(() => {
        const xOffset = Math.random() * 10 - 5;
        const yOffset = Math.random() * 10 - 5;
        jitterCursor.style.marginLeft = xOffset + 'px';
        jitterCursor.style.marginTop = yOffset + 'px';
    }, 50);
};

const disableMouseJitter = () => {
    clearInterval(jitterInterval);
    const jitterCursor = document.querySelector('div[style*="pointer-events: none"]');
    if (jitterCursor) jitterCursor.remove();
};

// Add fake virus detection
const virusList = document.createElement('div');
virusList.className = 'virus-list hidden';
virusList.id = 'virusList';
document.querySelector('.container').appendChild(virusList);

const fakeViruses = [
    { name: "Trojan.Win32.Miner", severity: "medium" },
    { name: "Backdoor.Java.ClassLoader", severity: "low" },
    { name: "HEUR:Exploit.Win32.Generic", severity: "high" },
    { name: "Rootkit.Boot.Scatter.a", severity: "critical" },
    { name: "Worm.VBS.Solow.a", severity: "medium" },
    { name: "Trojan-Ransom.Win32.Wanna", severity: "critical" },
    { name: "Backdoor.Win32.MEMZ", severity: "high" }
];

const addVirusToList = (virus) => {
    const virusItem = document.createElement('div');
    virusItem.className = `virus-item ${virus.severity === 'critical' || virus.severity === 'high' ? 'dangerous' : ''}`;
    virusItem.textContent = `${virus.name} - ${virus.severity.toUpperCase()}`;
    virusList.appendChild(virusItem);
    virusList.scrollTop = virusList.scrollHeight;
};

// Function to fake a system crash
const fakeSystemCrash = () => {
    document.body.classList.add('screen-flicker');
    document.body.classList.add('cursor-not-allowed');
    
    // Create multiple cracks
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createCrack();
        }, i * 200);
    }
    
    // Shake all elements
    const elements = document.querySelectorAll('.error-box:not(.hidden)');
    elements.forEach(el => el.classList.add('shake'));
    
    // Make text appear glitched
    const textElements = document.querySelectorAll('h1, .error-title, #scanStatus');
    textElements.forEach(el => {
        el.classList.add('glitch-text');
        el.setAttribute('data-text', el.textContent);
    });
};

// Simulate TensorFlow
const runTensorflowAnalysis = () => {
    console.log('Starting system analysis...');
    
    return new Promise((resolve) => {
        // Simulate processing time
        setTimeout(() => {
            const result = {
                vulnerabilities: [
                    'Unsecured network connection',
                    'Outdated system components',
                    'Suspicious process activity',
                    'Unencrypted data transmission'
                ],
                riskScore: 78, // 0-100
                recommendation: 'Immediate system update required'
            };
            
            console.log('Analysis complete', result);
            resolve(result);
        }, 5000);
    });
};

// Create confetti function
const createConfetti = () => {
    const colors = ['#f44336', '#2196f3', '#ffeb3b', '#4caf50', '#9c27b0'];
    
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
};

console.log("Script loaded and running");

let progress = 0;

const updateProgress = () => {
    console.log("Progress update:", progress);
    
    // Add virus detection
    if (progress === 15) {
        virusList.classList.remove('hidden');
        addVirusToList(fakeViruses[0]);
    }
    
    if (progress === 25) {
        addVirusToList(fakeViruses[1]);
        addVirusToList(fakeViruses[2]);
    }
    
    if (progress === 40) {
        addVirusToList(fakeViruses[3]);
        document.body.classList.add('cursor-wait');
    }
    
    if (progress === 50) {
        document.body.classList.remove('cursor-wait');
        document.body.classList.add('cursor-not-allowed');
        enableMouseJitter();
    }
    
    if (progress === 65) {
        addVirusToList(fakeViruses[4]);
        addVirusToList(fakeViruses[5]);
        addVirusToList(fakeViruses[6]);
    }
    
    if (progress === 80) {
        fakeSystemCrash();
    }
    
    progress += 1;
    progressBar.style.width = progress + '%';
    
    // Continue with original behavior
    if (progress === 10) {
        terminal.style.display = 'block';
        typeInTerminal(commands[0]);
        changeWindowTitle('⚠️ Warning: Security Scan');
    }
    
    // Rest of the original function logic
    if (progress < 30) {
        scanStatus.textContent = `Scanning system files... ${progress}%`;
    } else if (progress < 60) {
        scanStatus.textContent = `Checking network security... ${progress}%`;
        if (progress === 30) {
            error2.classList.remove('hidden');
            playSoundWithFallback(errorSound);
            changeWindowTitle('🔴 ALERT: Security Breach');
            showNotification('Security Alert', 'Unauthorized access detected!');
            typeInTerminal(commands[1]);
            document.body.style.backgroundColor = '#fffdfa';
        }
    } else if (progress < 85) {
        scanStatus.textContent = `Detecting vulnerabilities... ${progress}%`;
        if (progress === 60) {
            error3.classList.remove('hidden');
            error3.classList.add('flash');
            playSoundWithFallback(errorSound);
            changeWindowTitle('🚨 CRITICAL: Data Breach');
            showNotification('Critical Alert', 'Data breach in progress!');
            typeInTerminal(commands[2]);
            document.body.style.backgroundColor = '#fff8f8';
        }
        if (progress === 70) {
            fileDeletion.style.display = 'block';
            for (let i = 0; i < files.length; i++) {
                deleteFile(files[i], i);
            }
        }
        if (progress === 75) {
            progressBar.style.backgroundColor = '#ff9800';
            requestFullscreen();
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createCrack();
                }, i * 300);
            }
        }
    } else {
        scanStatus.textContent = `CRITICAL SYSTEM FAILURE IMMINENT... ${progress}%`;
        if (progress === 85) {
            error4.classList.remove('hidden');
            error4.classList.add('flash');
            playSoundWithFallback(alarmSound);
            changeWindowTitle('⛔ SYSTEM FAILURE');
            showNotification('Emergency Alert', 'System failure imminent!');
            typeInTerminal(commands[3]);
            createCrack();
            document.body.style.backgroundColor = '#fff0f0';
            progressBar.style.backgroundColor = '#f44336';
        }
    }
    
    if (progress < 100) {
        setTimeout(updateProgress, 100);
    } else {
        setTimeout(showBSOD, 1000);
    }
};

const showBSOD = () => {
    bsod.style.display = 'flex';
    
    // Simulate typing for the collecting info text
    let text = "Collecting information about your system...";
    collecting.textContent = "";
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            collecting.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                collecting.textContent = "Collection complete. Preparing to restart...";
                setTimeout(() => {
                    restart.style.display = 'block';
                    let count = 5;
                    
                    const startCountdown = () => {
                        countdown.textContent = count;
                        if (count > 0) {
                            count--;
                            setTimeout(startCountdown, 1000);
                        } else {
                            revealPrank();
                        }
                    };
                    
                    startCountdown();
                }, 1500);
            }, 2000);
        }
    };
    
    setTimeout(typeWriter, 1000);
};

// Run TensorFlow analysis when revealing prank
const runAnalysis = async () => {
    try {
        const result = await runTensorflowAnalysis();
        console.log('TensorFlow analysis:', result);
    } catch (error) {
        console.error('TensorFlow analysis failed:', error);
    }
};

const revealPrank = () => {
    // Remove our added effects first
    document.body.classList.remove('screen-flicker', 'cursor-wait', 'cursor-not-allowed', 'cursor-none');
    disableMouseJitter();
    const glitchedElements = document.querySelectorAll('.glitch-text');
    glitchedElements.forEach(el => el.classList.remove('glitch-text'));
    
    // Reveal the prank
    bsod.style.display = 'none';
    document.body.style.backgroundColor = 'white';
    prankMessage.style.display = 'block';
    createConfetti();
    changeWindowTitle('April Fools!');
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.innerHTML = '';
    errorSound.pause();
    alarmSound.pause();
    errorSound.currentTime = 0;
    alarmSound.currentTime = 0;
    showNotification('April Fools!', 'Your computer is fine. This was a prank!');
    runAnalysis();
};

// Add event listener to ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    // Start the prank after a short delay
    setTimeout(updateProgress, 1500);
});

// If DOMContentLoaded already fired, start anyway
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log("Document already loaded, starting directly");
    setTimeout(updateProgress, 1500);
}
