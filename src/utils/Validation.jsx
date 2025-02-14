import * as yup from "yup";

export const FILE_SIZE = 5 * 1024 * 1024; // 2MB
export const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "application/pdf"];
export const phoneLengthByCountry = {
  in: { min: 12, max: 12 },
  fr: { min: 11, max: 11 },
  ru: { min: 11, max: 11 },
  us: { min: 11, max: 11 },
  nz: { min: 12, max: 12 },
};
export const getDynamicDropoffSchema = (dropoffCount) => {
  let dropoffSchemas = {};
  dropoffSchemas[`company`]=yup.string().required("Company name is required");
  dropoffSchemas["pickupnote"]= yup.string();
  dropoffSchemas["email"]= yup.string().required("Email is required").email("Please enter a valid email");
  dropoffSchemas["phoneNumber"]= yup
        .string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone number should contain only digits")
        .test("length", "Phone number length is invalid", function (value) {
          const { country } = this.parent;
          const countryCode = country ? country : null;
          if (countryCode && phoneLengthByCountry[countryCode]) {
            const { min, max } = phoneLengthByCountry[countryCode];
            return value.length >= min && value.length <= max;
          }
          return true; 
        });
  dropoffSchemas["pickupDate"]=yup.date().nullable();
  dropoffSchemas["pickupTime"]= yup.string().matches(/^([0-9]{2}):([0-9]{2})$/, "Please enter a valid time (HH:MM)");
  dropoffSchemas["repeatOrder"]= yup.boolean().default(false);
  dropoffSchemas["selectedOption"]= yup.string(),
  dropoffSchemas["days"]=yup.string().when("selectedOption", {
    is: (value) => ["Weekly", "Monthly"].includes(value),
    then: yup.number().required("Day is required."),
  });
  dropoffSchemas["repeatEvery"]= yup
    .string() // Treat it as a string because `<select>` returns a string
    .nullable();
  dropoffSchemas["until"]=yup.date().typeError("Invalid date format");

  dropoffSchemas["selectedDays"]= yup.object().shape({
    Monday: yup.boolean(),
    Tuesday: yup.boolean(),
    Wednesday: yup.boolean(),
    Thursday: yup.boolean(),
    Friday: yup.boolean(),
    Saturday: yup.boolean(),
    Sunday: yup.boolean(),
  });
  dropoffSchemas["onDay"]= yup.string().nullable();
  dropoffSchemas["onThe"]= yup.string().nullable();
  for (let i = 0; i < dropoffCount; i++) {
    dropoffSchemas[`file-${i}`] = yup.mixed().required("A file is required").test("fileSize", "File size is too large", (value) => {
            return value && value[0] && value[0].size <= FILE_SIZE;
          })
          .test("fileType", "Unsupported file type", (value) => {
            return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
          });
    dropoffSchemas[`packageId-${i}`] =  yup.string().required("Package id is required").min(3, "Package id must be at least 3 characters long");
    dropoffSchemas[`pickupnote-${i}`] = yup.string().notRequired();
    dropoffSchemas[`dname-${i}`] =yup.string().required("Name is required").min(3, "Name must be at least 3 characters long");
    dropoffSchemas[`dlastname-${i}`] =yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters long");
    dropoffSchemas[`dcompany-${i}`] = yup.string().notRequired();
    dropoffSchemas[`demail-${i}`] = yup.string().required("Email is required").email("Please enter a valid email");
    dropoffSchemas[`dphoneNumber-${i}`] = yup.string().required("Phone number is required").matches(/^\d+$/, "Phone number should contain only digits").test("length", "Phone number length is invalid", function (value) {
      const { dcountry } = this.parent; 
      const countryCode = dcountry ? dcountry : null;
      if (countryCode && phoneLengthByCountry[countryCode]) {
        const { min, max } = phoneLengthByCountry[countryCode];
        return value.length >= min && value.length <= max;
      }
      return true; // If no country is selected, do not apply length validation
    });
    dropoffSchemas[`dropoffnote-${i}`] = yup.string().notRequired();
  }

  return yup.object().shape(dropoffSchemas);
};