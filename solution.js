function survivingRobotsHealths(positions, healths, directions) {
    // Combine positions, healths, directions with their initial indices
    const robots = positions.map((pos, i) => ({
        pos: pos,
        health: healths[i],
        dir: directions[i],
        index: i
    }));
    
    // Sort robots by their positions
    robots.sort((a, b) => a.pos - b.pos);
    
    const stack = [];
    
    for (let i = 0; i < robots.length; i++) {
        const currentRobot = robots[i];
        
        if (currentRobot.dir === 'R') {
            stack.push(currentRobot);
        } else { // currentRobot.dir === 'L'
            while (stack.length && stack[stack.length - 1].dir === 'R' && currentRobot.health > 0) {
                const rightRobot = stack[stack.length - 1];
                
                if (rightRobot.health > currentRobot.health) {
                    currentRobot.health = 0;
                    rightRobot.health -= 1;
                } else if (rightRobot.health === currentRobot.health) {
                    currentRobot.health = 0;
                    stack.pop();
                } else {
                    currentRobot.health -= 1;
                    stack.pop();
                }
            }
            
            if (currentRobot.health > 0) {
                stack.push(currentRobot);
            }
        }
    }
    
    // Gather the surviving robots
    const survivors = stack.sort((a, b) => a.index - b.index);
    
    return survivors.map(robot => robot.health);
}

// Example usage:
const positions = [3, 5, 2, 6];
const healths = [10, 10, 15, 12];
const directions = "RLRL";
console.log(survivingRobotsHealths(positions, healths, directions));  // Output: [14]
