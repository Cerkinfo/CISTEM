import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import fs from "fs";
import { supabase } from "../packages/functions/Client";

const BASE_URL = "https://cistem.cerkinfo.be/drain";

async function generate() {
  const { data, error } = await supabase
    .from("drain")
    .select("id"); // id = UUID

  if (error) throw error;

  const qrs = [];

for (const row of data!) {
  const url = `${BASE_URL}/${row.id}`;
  const qr = await QRCode.toDataURL(url);
  qrs.push({ id: row.id, qr });
}

const doc = new PDFDocument({ size: "A4", margin: 40 });
doc.pipe(fs.createWriteStream("qrcodes.pdf"));

let x = 40;
let y = 40;
const qrSize = 150;

for (const item of qrs) {
  doc.image(item.qr, x, y, { width: qrSize });

  x += qrSize + 20;
  if (x > 400) {
    x = 40;
    y += qrSize + 50;
  }

  if (y > 700) {
    doc.addPage();
    x = 40;
    y = 40;
  }
}

doc.end();

}

generate();
