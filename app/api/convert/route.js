import axios from "axios";

export async function POST(req) {
  const { fileUrl } = await req.json();
  const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDBiN2I3NDAwYTM2OTY3OWIxZGZkYmM0OTljY2JlZGU0ZjJkNTI5MmQ5NTRlOThjYmI0YTM4MzVjZTQxZTdiY2UyOGI0MjZkNDA4ZDdhZTAiLCJpYXQiOjE3Mzg5OTk0NjkuMDUzMjI4LCJuYmYiOjE3Mzg5OTk0NjkuMDUzMjI5LCJleHAiOjQ4OTQ2NzMwNjkuMDQ2MzM3LCJzdWIiOiI2NTE1NDIwNSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.YrifQERowOr5MT0ijSqQUhONdEGwFPYAFa9cMUO2bYPoWsp73I06s16JXd5wmEPHYLgnM40s3rkd6lpSgHfqytd8IEX8Xl0oCzHu3FyvOlwECH6n5c2H7xPuR4LNrVoQeMaOo3xh2HRLv4ODVRez1UPL0fPX0iLQAyMezAL8heT5LwH5iwdxwCuu8-F83RKaLaHVB8m7Op6rhIRxLx_jibk5a_bVq1BZijetxgSnuWMpUcmayzIjJP2ReNj52cAI-QEuhCCdlP8OBvJYNm4xUzb2xFXtb4pGodnu7UMXPs-B5Ey47NBYltV0UMtpdx6UvjYl1hjYyWnCLApvLxVY1mqWcj1ny7wsxDH6xQDzJWPqA40fim0fD6yZJTILxXSL0toWq72HFoBEEDb2LmPItipXCIJytgHx6ok9gCxaFTaN1I8Z_8vWpbMpH_N74iZHRVQYrnwZuNUGYZIPswUbT1wPPeJAAPaCVeNptTg59HgNSnCIPQNeCxMEreR_p2GFqwza2Z66y8gWszGKjX3V2Ptyt3YXqruDdySDmvjgxogy_QsEqET6aP34vbduc4_8HPOofmGH2KRl3oKVIvTjFuQ_sPcaXTD3hEbiIhY4qv6LWUwK8cY8UmhGrsLzemPGOsNelZ1cyA6VXWTDcRuIbGJczPrys3SBLWKYw38TK1A";

  try {
    // Gửi request chuyển đổi
    const response = await axios.post(
      "https://api.cloudconvert.com/v2/convert",
      {
        input: "url",
        file: fileUrl,
        output_format: "pdf",
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return Response.json({ pdfUrl: response.data.data.url });
  } catch (error) {
    console.error("Lỗi chuyển đổi:", error);
    return Response.json({ error: "Chuyển đổi thất bại" }, { status: 500 });
  }
}
