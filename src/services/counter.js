import Counter from "../models/counter.js";

async function generateProductCode() {
  const counter = await Counter.findOneAndUpdate(
    { key: "product" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return `PRD-${String(counter.seq).padStart(6, "0")}`;
}

export default generateProductCode;
