### scrape data of list of [icsi](https://www.icsi.edu/member/member-search/) memebership

### prerequsite
- nodejs >= 16 ([installtion link](https://nodejs.org/en/download/))
- typesense

### scraping
Used [puppeteer](https://github.com/puppeteer/puppeteer), for scraping data from site, since the data is rendered server side, html is send back by the server.

- [scarping script](scraper/scrape.js)

#### FCS list
- fcs list has 9535 records
- [file](scraper/fcs-data.json)

#### ACS list
- ACS list has 47101 records (retrived 10000 records as of now)
- [file](scraper/acs-data.json)

**since the service is slow and crashing at a time, scraping this much data is taking time, and this site has some logical bugs in ACS pagination logic**

#### indexing
[typesense](https://typesense.org/) is opensource, lighting fast memory database.

##### features implemented
- full text serach
- prefix search
- fuzzy search
  
#### Install typesense

```bash
docker run -p 8108:8108 -v/tmp/data:/data typesense/typesense:0.23.1 --data-dir /data --api-key=Hu52dwsas2AdxdE
```

#### start server
```bash
node api/index.js
```

#### API

- [postman collection](https://www.getpostman.com/collections/67151104619cf0707203)

api post request takes one or more of following field and query the list of data.
- type
- name
- organization
- designation
- membershipNumber
- cpNumber
- address
- city
- email
- mobile


```bash
curl -X POST \
  http://localhost:3000/search \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'type=fcs&membershipNumber=&email=&mobile=&city=&address=BUSINESS&cpNumber=&organization=&designation=&name='
```

```json
[
    {
        "facet_counts": [],
        "found": 95,
        "hits": [
            {
                "document": {
                    "address": "OFFICE NO.1703, 17TH FLOOR,,G-SQUARE BUSINESS PARK,,SEC. 30A, OPP.SANPADA RLY STN, SANPADA, NAVI MUMBAI,Maharashtra,THANE,THANE,400703",
                    "city": "THANE",
                    "cpNumber": "16893",
                    "designation": "PARTNER",
                    "email": "csshashankghaisas@gmail.com",
                    "id": "9429",
                    "membershipNumber": "F11782",
                    "mobile": "9820572587",
                    "name": "CS SHASHANK CHINTAMAN GHAISAS",
                    "organization": "AVS & ASSOCIATES (COMPANY SECRETARIES)"
                },
                "highlights": [
                    {
                        "field": "address",
                        "matched_tokens": [
                            "BUSINESS"
                        ],
                        "snippet": "OFFICE NO.1703, 17TH FLOOR,,G-SQUARE <mark>BUSINESS</mark> PARK,,SEC. 30A, OPP.SANPADA RLY STN, SANPADA, NAVI MUMBAI,Maharashtra,THANE,THANE,400703"
                    }
                ],
                "text_match": 72341265420648450
            },
            {
                "document": {
                    "address": "206, SHLOK BUSINESS CENTER,BESIDES APPLE HOSPITAL,UDHNA DARWAJA,Gujarat,,,395002",
                    "city": "",
                    "cpNumber": "11194",
                    "designation": "COMPANY SECRETARIES (*)",
                    "email": "CS.MEGHNAPATEL2017@GMAIL.COM",
                    "id": "9318",
                    "membershipNumber": "F11949",
                    "mobile": "9725533601",
                    "name": "CS MEGHNA MONARK PATEL",
                    "organization": "MEGHNA PATEL & ASSOCIATES"
                },
                "highlights": [
                    {
                        "field": "address",
                        "matched_tokens": [
                            "BUSINESS"
                        ],
                        "snippet": "206, SHLOK <mark>BUSINESS</mark> CENTER,BESIDES APPLE HOSPITAL,UDHNA DARWAJA,Gujarat,,,395002"
                    }
                ],
                "text_match": 72341265420648450
            },
            {
                "document": {
                    "address": "1703, G SQUARE BUSINESS PARK,OPP. SANPADA RAILWAY STATION,SECTOR 30A, SANPADA,,Maharashtra,THANE,THANE,400703",
                    "city": "THANE",
                    "cpNumber": "16883",
                    "designation": "COMPANY SECRETARIES (*)",
                    "email": "ANANDSMUKHERJEE@GMAIL.COM",
                    "id": "9197",
                    "membershipNumber": "F11804",
                    "mobile": "9702408000",
                    "name": "CS ANAND SUBROTO MUKHERJEE",
                    "organization": "AVS & ASSOCIATES"
                },
                "highlights": [
                    {
                        "field": "address",
                        "matched_tokens": [
                            "BUSINESS"
                        ],
                        "snippet": "1703, G SQUARE <mark>BUSINESS</mark> PARK,OPP. SANPADA RAILWAY STATION,SECTOR 30A, SANPADA,,Maharashtra,THANE,THANE,400703"
                    }
                ],
                "text_match": 72341265420648450
            },
            {
                "document": {
                    "address": "F157, NANO WING, FANTASIA BUSINESS PARK,NEAR INORBIT MALL, SECTOR 30A,VASHI,,,,400703",
                    "city": "",
                    "cpNumber": "25306",
                    "designation": "COMPANY SECRETARIES (*)",
                    "email": "CSHIMANSHUGAJRA@GMAIL.COM",
                    "id": "8882",
                    "membershipNumber": "F11691",
                    "mobile": "8976389982",
                    "name": "CS HIMANSHU BASANTLAL GAJRA",
                    "organization": "HIMANSHU GAJRA & COMPANY"
                },
                "highlights": [
                    {
                        "field": "address",
                        "matched_tokens": [
                            "BUSINESS"
                        ],
                        "snippet": "F157, NANO WING, FANTASIA <mark>BUSINESS</mark> PARK,NEAR INORBIT MALL, SECTOR 30A,VASHI,,,,400703"
                    }
                ],
                "text_match": 72341265420648450
            },
            {
                "document": {
                    "address": "108-109, PARMESH BUSINESS CENER-I,PLOT NO 20 COMMUNITY CENTER,KARKARDOOMA,Delhi,,,110092",
                    "city": "",
                    "cpNumber": "14448",
                    "designation": "COMPANY SECRETARIES (*)",
                    "email": "PRINCEMSINHA@YAHOO.COM",
                    "id": "8635",
                    "membershipNumber": "F10689",
                    "mobile": "9899527596",
                    "name": "CS PRINCE MOHAN SINHA",
                    "organization": "PRINCE M SINHA & ASSOCIATES"
                },
                "highlights": [
                    {
                        "field": "address",
                        "matched_tokens": [
                            "BUSINESS"
                        ],
                        "snippet": "108-109, PARMESH <mark>BUSINESS</mark> CENER-I,PLOT NO 20 COMMUNITY CENTER,KARKARDOOMA,Delhi,,,110092"
                    }
                ],
                "text_match": 72341265420648450
            },
            {
                "document": {
                    "address": "FAYA BUSINESS PARK,AL MAJAZ PARK,SHARJAH,SHARJHAN,Sharjhan,Sharjhan,29781",
                    "city": "Sharjhan",
                    "cpNumber": "0",
                    "designation": "SENIOR MANAGER LEGAL & COMPLIANCE",
                    "email": "kashif178@gmail.com",
                    "id": "8592",
                    "membershipNumber": "F11002",
                    "mobile": "554578574",
                    "name": "CS KASHIF SHAMIM",
                    "organization": "CHEMIE TECH GROUP"
                },
                "highlights": [
                    {
                        "field": "address",
                        "matched_tokens": [
                            "BUSINESS"
                        ],
                        "snippet": "FAYA <mark>BUSINESS</mark> PARK,AL MAJAZ PARK,SHARJAH,SHARJHAN,Sharjhan,Sharjhan,29781"
                    }
                ],
                "text_match": 72341265420648450
            },
            {
                "document": {
                    "address": "TOWER - A 3RD FLOOR,UNITECH BUSINESS PARK ,SOUTH CITY 1 SECTOR 41,Haryana,,,122001",
                    "city": "",
                    "cpNumber": "0",
                    "designation": "COMPANY SECRETARY",
                    "email": "cs.mmjain@gmail.com",
                    "id": "8513",
                    "membershipNumber": "F9598",
                    "mobile": "9871712775",
                    "name": "CS MURLEE MANOHAR JAIN",
                    "organization": "FORTIS HEALTHCARE LIMITED"
                },
                "highlights": [
                    {
                        "field": "address",
                        "matched_tokens": [
                            "BUSINESS"
                        ],
                        "snippet": "TOWER - A 3RD FLOOR,UNITECH <mark>BUSINESS</mark> PARK ,SOUTH CITY 1 SECTOR 41,Haryana,,,122001"
                    }
                ],
                "text_match": 72341265420648450
            },
            {
                "document": {
                    "address": "408 BUSINESS EDIFICE,CANAL ROAD,,Gujarat,RAJKOT,,360110",
                    "city": "",
                    "cpNumber": "15537",
                    "designation": "COMPANY SECRETARIES (*)",
                    "email": "CS.JAYGOHIL@GMAIL.COM",
                    "id": "8496",
                    "membershipNumber": "F10901",
                    "mobile": "9998400609",
                    "name": "CS JAY ASHOK BHAI GOHIL",
                    "organization": "JG & ASSOCIATES"
                },
                "highlights": [
                    {
                        "field": "address",
                        "matched_tokens": [
                            "BUSINESS"
                        ],
                        "snippet": "408 <mark>BUSINESS</mark> EDIFICE,CANAL ROAD,,Gujarat,RAJKOT,,360110"
                    }
                ],
                "text_match": 72341265420648450
            },
            {
                "document": {
                    "address": "421, GOLDCREST BUSINESS PARK,,LBS MARG,,OPP. SHREYAS , GHATKOPAR WEST,Maharashtra,MUMBAI,MUMBAI,400086",
                    "city": "MUMBAI",
                    "cpNumber": "14520",
                    "designation": "COMPANY SECRETARIES (*)",
                    "email": "MAHARSHI@MAHARSHIGANATRA.COM",
                    "id": "8042",
                    "membershipNumber": "F11332",
                    "mobile": "7208193776",
                    "name": "CS MAHARSHI RAJESH GANATRA",
                    "organization": "MAHARSHI GANATRA & ASSOCIATES"
                },
                "highlights": [
                    {
                        "field": "address",
                        "matched_tokens": [
                            "BUSINESS"
                        ],
                        "snippet": "421, GOLDCREST <mark>BUSINESS</mark> PARK,,LBS MARG,,OPP. SHREYAS , GHATKOPAR WEST,Maharashtra,MUMBAI,MUMBAI,400086"
                    }
                ],
                "text_match": 72341265420648450
            },
            {
                "document": {
                    "address": "A/501L, JASWANTI ALLIED BUSINESS CENTRE,NEAR KHWAISH RESIDENCE, KANCH PADA, RAMCHANDRA LANE EXTENSION ROAD,MALAD (WEST), ,Maharashtra,,,400064",
                    "city": "",
                    "cpNumber": "12015",
                    "designation": "COMPANY SECRETARIES (*)",
                    "email": "MIHENHALANI@GMAIL.COM",
                    "id": "8029",
                    "membershipNumber": "F9926",
                    "mobile": "9769327632",
                    "name": "CS MIHEN JYOTINDRA HALANI",
                    "organization": "MIHEN HALANI & ASSOCIATES"
                },
                "highlights": [
                    {
                        "field": "address",
                        "matched_tokens": [
                            "BUSINESS"
                        ],
                        "snippet": "A/501L, JASWANTI ALLIED <mark>BUSINESS</mark> CENTRE,NEAR KHWAISH RESIDENCE, KANCH PADA, RAMCHANDRA LANE EXTENSION ROAD,MALAD (WEST), ,Maharashtra,,,400064"
                    }
                ],
                "text_match": 72341265420648450
            }
        ],
        "out_of": 9531,
        "page": 1,
        "request_params": {
            "collection_name": "fcs",
            "per_page": 10,
            "q": "BUSINESS"
        },
        "search_cutoff": false,
        "search_time_ms": 0
    }
]

```