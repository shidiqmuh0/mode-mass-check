const axios = require('axios');

const addresses = [
  'ISI ADDRES EVM MU',
  'ISI ADDRES EVM MU',
  'ISI ADDRES EVM MU'
];

// Loop melalui setiap alamat, mengubahnya menjadi huruf kecil, dan membuat permintaan ke API Firestore
addresses.forEach(async (address) => {
  try {
    const lowercaseAddress = address.toLowerCase();
    const response = await axios.get(`https://firestore.googleapis.com/v1/projects/mode-claim/databases/wallet-stats/documents/wallets/${lowercaseAddress}`);
    const data = response.data;

    // Ambil nilai yang diperlukan dari respons
    const { total_points, mode_tokens } = data.fields;
    
    // Output di console log
    console.log("---------------------------------------");
    console.log(`Address: ${data.name.split('/').pop()}`);
    console.log(`Token: ${mode_tokens.doubleValue}`);
    console.log("---------------------------------------");
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("---------------------------------------");
      console.log(`Address ${address} tidak ditemukan.`);
      console.log("---------------------------------------");
    } else {
      console.error("Ada kesalahan dalam permintaan:", error.message);
    }
  }
});
