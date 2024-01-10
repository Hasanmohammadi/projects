
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "Common": path.resolve(__dirname, 'src/Common/index'),
      "Hooks": path.resolve(__dirname, 'src/Hooks/'),
      "Constants":path.resolve(__dirname, 'src/Constants/'),
      "Helpers":path.resolve(__dirname, 'src/Helpers/'),
      "Pages":path.resolve(__dirname, 'src/Pages/'),
      "Services":path.resolve(__dirname, 'src/Services/'),
      "Router":path.resolve(__dirname, 'src/Router/'),
      "FormValidation":path.resolve(__dirname, 'src/FormValidation/'),
      "Components":path.resolve(__dirname, 'src/Components/'),
      "Assets":path.resolve(__dirname, 'src/Assets/'),
      "Context":path.resolve(__dirname, 'src/Context/'),
    }
  }
};