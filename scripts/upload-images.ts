import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const imagesDir = path.join(process.cwd(), "public", "images");

async function uploadImages() {
  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    const filePath = path.join(imagesDir, file);

    const { error } = await supabase.storage
      .from("products")
      .upload(file, fs.readFileSync(filePath), {
        upsert: true,
        contentType: "image/jpeg",
      });

    if (error) {
      console.log(`❌ ${file}`);
      console.log(error.message);
    } else {
      console.log(`✅ ${file}`);
    }
  }

  console.log("🎉 Finished Uploading Images");
}

uploadImages();