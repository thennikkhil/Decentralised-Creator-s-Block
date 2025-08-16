// hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24", // Make sure this is 0.8.20 or higher
    settings: {
      evmVersion: "cancun", // <--- ADD THIS LINE
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // ... your network configs
  },
  // ... other settings
};

export default config;