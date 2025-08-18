import { Writable } from "stream";
import wkhtmltopdf from "wkhtmltopdf";

export function generatePDF(html: string, stream: Writable) {
  wkhtmltopdf(html, { output: undefined }).pipe(stream);
}
