import React from "react";
import QRCode from "qrcode";

import axios from "axios";
import { baseURL } from "../../../../../credential.json";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import { createCanvas } from "canvas";
import "jspdf-autotable";

export const downloadLabel = (orderId,update=0) => {
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
    params:{
      orderId,
      update
    }
  };

  axios
    .get(`${baseURL}/seller/manifest/download`, config)
    .then((res) => {
      if (res.data.status === 200) {
        let payload = res.data.payload;
        console.log("payload",payload)
        var doc = new jsPDF();
        
        var img = new Image();
        img.src = "/img/logo2.png";
        payload.map((item,index)=>{
          doc.setTextColor(100, 0, 0);
        doc.addImage(img, "JPEG", 10, 10, 10, 10);
        doc.text(item.seller.name,20,40);
        doc.setFontSize(8)
        doc.text(`${item.seller.rbaFirstLine} ${item.businessName},`,20,45)
        doc.text(`${item.seller.rbaSecondLine} ${item.seller.rbaCity.name} ${item.seller.rbaState.name},`,20,50)
        doc.text(`${item.seller.rbaPinCode}`,20,55)
        function headRows() {
          return [
            {
              product: "Product",
              qty: "Qty",
              orignal: "Original price",
              total: "Total",
            },
          ];
        }
        function bodyRows(rowCount, pdfBody) {
          console.log("pdf body", pdfBody);
          rowCount = rowCount || 10;
          let body = [];
          // body.push({Product:,name:pdfBody.customer.name})

          pdfBody.items.map((item) => {
            body.push({
              qty: item.quantity,
              product: item.product.name,
              orignal: item.product.originalPrice,
              total: item.product.sellingPrice,
            });
          });

          return body;
        }
        doc.autoTable({
          head: headRows(),
          body: bodyRows(5, item.order),
          startY: 100,
        });
        const canvas = createCanvas(200, 200);
        let cad = JsBarcode(canvas, item.order.orderId);
        let barcode = canvas.toDataURL();
        doc.addImage(barcode, "JPEG", 10, 80, 80, 20);
        QRCode.toDataURL(item.order.orderId).then((url) => {
          console.log("image url", url);
          doc.addImage(url, "JPEG", 150, 10, 50, 50);
          // doc.autoPrint()
          doc.save(`label_${item.order.orderId}.pdf`);
        });
      })
        console.log("working download label", res);
      }
    })
    .catch((err) => console.log(err));
};

export const downloadManifest = (orderId) => {
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
    params:{
      orderId
    }
  };

  axios
    .get(`${baseURL}/seller/manifest/download`, config)
    .then((res) => {
      if (res.data.status === 200) {
        let payload = res.data.payload;
        var doc = new jsPDF();
        // doc.setTextColor(100,0,0);
        var img = new Image();
        img.src = "/img/logo2.png";

        payload.map((item,index)=>{
        doc.setFontSize(8);
        doc.text("ORDERED THROUGH", 20, 20);
        doc.setFontSize(12);
        doc.text("Logistics Manifest", 85, 20);
        doc.setFontSize(12);
        doc.setFontStyle("bold");
        doc.text("Amvirgin", 20, 30);
        doc.addImage(img, "JPEG", 40, 25, 10, 10);
        doc.setFontStyle("normal");
        doc.text(item.seller.name,20,40);
        doc.setFontSize(8)
        doc.text(`${item.seller.rbaFirstLine} ${item.businessName},`,20,45)
        doc.text(`${item.seller.rbaSecondLine} ${item.seller.rbaCity.name} ${item.seller.rbaState.name},`,20,50)
        doc.text(`${item.seller.rbaPinCode}`,20,55)
        function headRows() {
          return [
            {
              sNo: "S.No",
              trackingId: "Tracking Id",
              formsRequired: "Forms Required",
              orderId: "Order Id",
              rts: "RTS done on",
              notes: "Notes",
            },
          ];
        }
        function bodyRows(rowCount, pdfBody) {
          console.log("pdf body", pdfBody);
          rowCount = rowCount || 10;
          let body = [];
          // body.push({Product:,name:pdfBody.customer.name})

          body.push({
            sNo: 1,
            orderId: pdfBody.orderId,
          });

          return body;
        }
        doc.autoTable({
          head: headRows(),
          body: bodyRows(5, item.order),
          startY: 60,
        });
        let finalY = doc.lastAutoTable.finalY;
        doc.setFontSize(8);
        doc.text("TO BE FILLED BY EKART LOGISTICS EXECUTIVE", 60, finalY+10);
        doc.text("Pickup In time:", 25, finalY+15);
        doc.line(50, finalY+15, 80, finalY+15);
        doc.text("Total items picked:", 85, finalY+15);
        doc.line(110, finalY+15, 140, finalY+15);
        doc.text("Pickup Out time:", 25, finalY+25);
        doc.line(50, finalY +25, 80, finalY +25);
        doc.text("All shipments have Amvirgin packaging:", 85, finalY+25);
        doc.text("yes", 140, finalY+25);
        doc.rect(147, finalY+22
          , 3, 3);
        doc.text("no", 155, finalY +25);
        doc.rect(160, finalY +22, 3, 3);
        doc.text("FE Name:", 25, finalY +35);
        doc.line(50, finalY +35, 80, finalY +35);
        doc.text("Seller Name:", 85, finalY +35);
        doc.line(110, finalY +35, 140, finalY +35);
        doc.text("FE Signature:", 25, finalY +45);
        doc.line(50, finalY +45, 80, finalY +45);
        img.src = item.seller.signature
         
        doc.text("Seller Signature:", 85, finalY +45);
        doc.addImage(img, "JPEG", 110 , finalY +40, 30, 10); 
        doc.line(110,  finalY +45, 140,  finalY +45);
        doc.rect(10, 10, 190, finalY +70);
        doc.setFontSize(10);
        doc.text("This is a system generated document", 60, finalY +65);
        doc.save(`manifest_${item.order.orderId}.pdf`);
      })
        console.log("working download label", res);
      }
    })
    .catch((err) => console.log(err));
};
