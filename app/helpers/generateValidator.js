const fs = require("fs");
const path = require("path");

function generateValidator(validatorName) {
  const validatorTemplate = `
      const { body, validationResult } = require("express-validator");
      
      const ${validatorName} = [
        // body("title").notEmpty().withMessage("Title is required")
      ];

      const validatorMessages = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.mapped() });
        }
        next();
      };

      module.exports = {
        ${validatorName},
        validatorMessages,
      };
    `;

  const validatorsDir = path.join(__dirname, "../validations");
  if (!fs.existsSync(validatorsDir)) {
    fs.mkdirSync(validatorsDir);
  }

  const validatorFile = path.join(validatorsDir, `${validatorName}.js`);

  if (fs.existsSync(validatorFile)) {
    console.error(`${validatorName} already exists!`);
    return;
  }

  fs.writeFileSync(validatorFile, validatorTemplate);

  console.log(`${validatorName} created successfully!`);
}

// Extracting validator name from command line arguments
const [, , validatorName] = process.argv;

if (!validatorName) {
  console.error("Please provide a validator name.");
  process.exit(1);
}

generateValidator(validatorName.replace(".js", ""));
