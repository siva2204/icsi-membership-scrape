const express = require("express");
const { typesense } = require("./typesense");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/search", async (req, res) => {
  let {
    type,
    name,
    organization,
    designation,
    membershipNumber,
    cpNumber,
    address,
    city,
    email,
    mobile,
  } = req.body;

  let searchParameters = {
    q: "",
    query_by: "",
  };

  try {
    if (type != "acs" && type != "fcs") {
      return res
        .status(400)
        .json({ message: "bad request, type should be one of ACS or FCS" });
    }

    let promise = [];

    if (membershipNumber && membershipNumber.length > 0) {
      searchParameters.q = membershipNumber;
      searchParameters.query_by = "membershipNumber";
      promise.push(
        typesense.collections(type).documents().search(searchParameters)
      );
    }

    if (email && email.length > 0) {
      searchParameters.q = email;
      searchParameters.query_by = "email";
      promise.push(
        typesense.collections(type).documents().search(searchParameters)
      );
    }

    if (mobile && mobile.length > 0) {
      searchParameters.q = mobile;
      searchParameters.query_by = "mobile";
      promise.push(
        typesense.collections(type).documents().search(searchParameters)
      );
    }

    if (name && name.length > 0) {
      searchParameters.q = name;
      searchParameters.query_by = "name";
      promise.push(
        typesense.collections(type).documents().search(searchParameters)
      );
    }

    if (organization && organization.length > 0) {
      searchParameters.q = organization;
      searchParameters.query_by = "organization";
      promise.push(
        typesense.collections(type).documents().search(searchParameters)
      );
    }

    if (designation && designation.length > 0) {
      searchParameters.q = designation;
      searchParameters.query_by = "designation";
      promise.push(
        typesense.collections(type).documents().search(searchParameters)
      );
    }

    if (cpNumber && cpNumber.length > 0) {
      searchParameters.q = cpNumber;
      searchParameters.query_by = "cpNumber";
      promise.push(
        typesense.collections(type).documents().search(searchParameters)
      );
    }

    if (address && address.length > 0) {
      searchParameters.q = address;
      searchParameters.query_by = "address";
      promise.push(
        typesense.collections(type).documents().search(searchParameters)
      );
    }

    if (city && city.length > 0) {
      searchParameters.q = city;
      searchParameters.query_by = "city";
      promise.push(
        typesense.collections(type).documents().search(searchParameters)
      );
    }

    const data = await Promise.all(promise);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
