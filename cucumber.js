module.exports = {
    default: {
      //require: ['ts-node/register', './step-definitions/step.ts'],
      require: ['ts-node/register', './step-definitions/**/*.js'],
      format: ['pretty'],
      //features: ['./features/Ecommerce.feature']
      paths: ['./features/*.feature']
    }
  };