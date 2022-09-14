require("@babel/register");
const Typesense = require("typesense");

// Create a client
const typesense = new Typesense.Client({
  nodes: [
    {
      host: "localhost",
      port: "8108",
      protocol: "http",
    },
  ],
  apiKey: "Hu52dwsas2AdxdE", // update api key here
  numRetries: 3, // A total of 4 tries (1 original try + 3 retries)
  connectionTimeoutSeconds: 120, // Set a longer timeout for large imports
  logLevel: "debug",
});

let schema = {
  name: "fcs",
  num_documents: 0,
  fields: [
    {
      name: "name",
      type: "string",
      facet: false,
    },
    {
      name: "organization",
      type: "string",
      facet: false,
    },
    {
      name: "designation",
      type: "string",
      facet: false,
    },
    {
      name: "membershipNumber",
      type: "string",
      facet: false,
    },
    {
      name: "cpNumber",
      type: "string",
      facet: true,
    },
    {
      name: "address",
      type: "string",
      facet: false,
    },
    {
      name: "city",
      type: "string",
      facet: false,
    },
    {
      name: "email",
      type: "string",
      facet: false,
    },
    {
      name: "mobile",
      type: "string",
      facet: false,
    },
  ],
};

const init = async () => {
  try {
    // Delete if the collection already exists
    await typesense.collections("acs").delete();
    await typesense.collections("fcs").delete();
  } catch (error) {}

  try {
    await typesense.collections().create(schema);
    schema.name = "acs";
    await typesense.collections().create(schema);

    let documents = [];

    let data = require("../scraper/fcs-data.json");

    for (let i = 0; i < data.length; i++) {
      documents.push({
        name: data[i][1],
        organization: data[i][2],
        designation: data[i][3],
        membershipNumber: data[i][4],
        cpNumber: data[i][5],
        address: data[i][6],
        city: data[i][7],
        email: data[i][8],
        mobile: data[i][9],
      });
    }

    let result = await typesense
      .collections("fcs")
      .documents()
      .import(documents);

    documents = [];
    data = require("../scraper/acs-data.json");

    for (let i = 0; i < data.length; i++) {
      documents.push({
        name: data[i][1],
        organization: data[i][2],
        designation: data[i][3],
        membershipNumber: data[i][4],
        cpNumber: data[i][5],
        address: data[i][6],
        city: data[i][7],
        email: data[i][8],
        mobile: data[i][9],
      });
    }

    result = await typesense.collections("acs").documents().import(documents);

    console.log("data successfully indexed");
  } catch (error) {
    console.log(error);
    console.log("error importing data");
  }
};

init();

exports.typesense = typesense;
