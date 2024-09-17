export function generateMockIoTData() {
    const arr = [];
    for (let i = 0; i < 48; i++) {
      // Generate a random number between 5 and 80
      const value = Math.floor(Math.random() * 76) + 5;
      arr.push(value);
    }
    
    // Add some small values in random positions (simulate touched sections)
    const smallValuesCount = Math.floor(Math.random() * 10) + 3; // Add 3-10 small values
    for (let i = 0; i < smallValuesCount; i++) {
      const randomIndex = Math.floor(Math.random() * 48);
      arr[randomIndex] = Math.floor(Math.random() * 10) + 5; // Random small value between 5 and 15
    }
    
    return arr;
  }
  