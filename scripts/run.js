const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Kendall", "Shiv", "Roman"], // Names
    [
      "https://www.refinery29.com/images/8455987.jpg?format=webp&width=680&height=816&quality=85", // Images
      "https://pyxis.nymag.com/v1/imgs/fe4/f5f/e8e9fceb5a9ae6d19651f678fc382c7ac1-04-succession-sarah-snook.2x.rhorizontal.w700.jpg",
      "https://static.spin.com/files/2018/08/roman-roy-succession-1533564730.jpg",
    ],
    [250, 300, 325], // HP values
    [200, 150, 125], // Attack damage values
    "Logan Roy", // Boss name
    "https://static01.nyt.com/images/2020/07/28/arts/28EMMYS-COX1/merlin_157968993_ff1bc2c0-bf54-45b5-8547-657fa34a5a7b-superJumbo.jpg?quality=75&auto=webp",
    10000, // Boss HP
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log("Contract deployed to: ", gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  let returnedTokenURI = await gameContract.tokenURI(1);
  console.log("Token URI: ", returnedTokenURI);

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
