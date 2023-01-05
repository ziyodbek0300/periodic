const {GoogleSpreadsheet} = require('google-spreadsheet');

async function accessSpreadsheet() {
  const doc = new GoogleSpreadsheet('1wtNaHabMm5LUqKjNhXmSme_Db3CJe5g07_5fpT2YuUk');
  await doc.useServiceAccountAuth({
    client_email: 'beelab-sheet@test-efa2b.iam.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmXVXC0bdn6qko\nH2zWINK+0hQPElp98EIexcsN6teb3ZHRa1PM/NurIXOJy4HKKxOt0VEGVHcpzxDy\nbrODtSavuh/QhKaIJJbVdXfqN8X9wA1tjrz/Q1NXYrhnWSvTI03LejYrJtTJShBv\nInpnR+cpLxf7CCjW3e4MfhM9Ei7tPu/eoWXfD/aRaIFkb7M579akcjpZ1OIO2gzq\nSCAr7rBI+Pmg6ZyOCPJSXSQv0kExCkbj2UBNRdQ6XckQ48KJqvcIsiE3x8BT3adL\nmpkkL4aEOZL3IatmE9nt+N23pSVLL6+/2uBiqOJ4z9CbIPbki4wsJ8NMBa059Fot\ndtswFtv1AgMBAAECggEAEP5uwMBYakqLrfgLz5G5xVlDSEjZKo0sy+TreYf4L0lC\nWHCMtl9L9x6rJTO/Fc4xq+s6Shm9tG0c747EUptiEMhD8LJkKnsGV1axAaFh3apN\nFNhkUPTpIf+JE7GFqwMrsrHQr7a/PLKOnDOa6krrf4b6fZ+XQF+aLfeA8peVaJF/\ncPubvppTRsNmHWQup832mbLdOJbuACKN9wUsaVGBV3mep2zWLoEH4OZeFB0E1Zsl\n6XVqEBruLvLXTFE6pmyEcljqQ37W4wq4fCobCCcnNHgn0R+TDxrxd2acUl7AE6fH\nXfukb2BMILoluRlTVsN/ppkoP6pwjYNqAjAKx7+SrwKBgQDg3u2lO0Wx7A5an7fx\nYGgALStlUQNsV26opSyHXiRq7SAK421I8ElSbOgdxuzg01R14gJeZ1yom3/26Is8\n7MU4JODATCucIWMDo8aTIfMwUX8GHRjI32FJoVd3VMufjrMQzuHYAdbGLihyG/QF\nvQZggEnrFL7LiqilTs7PspOwowKBgQC9ZQmEU6K7dIz/I+zGkqqtqEOQ0MCI99Br\nOhH2gxwjLDOOqNr3p33f85i+CmZ/OKMKLCPNUvQTtLNnJ7HVYFtIRgY923zYnqNE\nxDzBmyH00H6d26Ub3FYw/cG+JgGtQuNVZSWHTBXpFjwgQE57LfNm01GfgyN2cQXI\ngJVO72XShwKBgQDa/H4VoOk4YZeA7XWmXKorMdHG8uQQh/y9w0zf7vAsKQxBTkVI\n+KeO23wYM3bPYz4nJpgD80iq8fPmMYQXKsTM7izpV8RIYcMY8k8ZTcCUV2kKPR+7\nzr3hhHu3PB6oHcGIJtCNGQ1dJepBZbN4OyKQq55Qjn1XnoqpoVuJrHBjXQKBgFU2\nFjgRIRBR+fX5Bdi5uEz1faC0K0v0ozL7J4XPq2MvyeqPkiUGmJ2gDcLDDyaCJui2\nv0zr26DaFjV9KIemGKvFxZ0jGWKkzTRtTiCVWYu6Gp2PaxPD6IuWQAr7MpnvlDSh\nk2byFpGOTXL9O9Iz9GT5AqpP6C6r3zw8jfC7yQYVAoGBAJ66Q20Q/oXdQBlQVuWH\n3+arSjf0xN4II2eX9rkg7L5Lk0HOqgfeRihKi2Esg+9kuE76BNZ8iJuYyTmfY6He\ngABHEHR48uYxj8ezDsaTXzbRPYqTswd1Z2TEMsMTvRYFBc/lB4aanGmR7cr6dabY\nxMyjfpkcZQ0zGoNo0kEpY+Nz\n-----END PRIVATE KEY-----\n',
  });
  await doc.loadInfo();
  let n = 0;
  const sheet = doc.sheetsByIndex[2];
  console.log(sheet.title);
  const rows = await sheet.getRows();
  const data = [];
  console.log(rows[4]['Код страны']);
  rows.forEach(e => {
    data.push({
      specificElectricalConductivity: e['Удельная электропроводность:'].split(' (См/м)')[0],
      electricType: e['Электрический тип:'],
      magneticType: e['Магнитный тип:'],
      volumeMagneticSusceptibility: e['Объёмная магнитная восприимчивость:'],
      specificMagneticSusceptibility: e['Удельная магнитная восприимчивость:'],
      molarMagneticSusceptibility: e['Молярная магнитная восприимчивость:'].split(' (м³/моль)')[0],
      resistivity: e['Удельное сопротивление:'].split(' (Ω · m)')[0],
      superconductivityTemperature: e['Температура сверхпроводимости:'],
    });
  });
  console.log(data);
  return data;
}

async function main() {
  const MongoClient = require('mongodb').MongoClient;

  const uri = 'mongodb://beelab:beelab-2022@185.251.89.97:27017/';
  // const uri = 'mongodb://localhost:27017/';

  const client = new MongoClient(uri, {
    useNewUrlParser: true, useUnifiedTopology: true,
  });

  client.connect(async err => {
    // const data = await accessSpreadsheet();
    const element = client.db('periodic').collection('elements');

    const reactivity = client.db('periodic').collection('electromagnetic_props.model.ts');
    const elements = await element.find({}).toArray();
    const reactivities = await reactivity.find({}).toArray();
    // reactivity.insertMany(data);
    for (let i = 0; i < elements.length; i++) {
      const a = element.updateOne({ _id: elements[i]._id }, { $set: { electromagneticProp: reactivities[i]._id.toString() } });
      console.log(a);
    }
  });
}

main().catch(console.error);
