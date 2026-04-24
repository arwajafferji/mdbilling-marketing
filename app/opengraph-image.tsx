import { ImageResponse } from "next/og";

export const alt =
  "MD Billing Experts — Medical billing and revenue cycle management for Houston practices";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0A2540 0%, #0E305A 50%, #143A6E 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#C91F1F",
              borderRadius: "50%",
            }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 14 L6 14 L8 8 L10 18 L12 5 L14 16 L16 14 L22 14"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            MD Billing Experts
          </div>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "76px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              maxWidth: "950px",
            }}
          >
            Stop leaving revenue on the table.
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#B9C9DD",
              lineHeight: 1.35,
              maxWidth: "900px",
            }}
          >
            Medical billing & revenue cycle management for Texas
            independent practices. 95% first-pass acceptance. 24–48 hour claim
            turnaround.
          </div>
        </div>

        {/* Bottom: URL + stat pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              color: "#C91F1F",
            }}
          >
            mdbillinghouston.com
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              color: "#B9C9DD",
            }}
          >
            <div
              style={{
                padding: "8px 18px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "999px",
              }}
            >
              20+ years
            </div>
            <div
              style={{
                padding: "8px 18px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "999px",
              }}
            >
              25+ practices
            </div>
            <div
              style={{
                padding: "8px 18px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "999px",
              }}
            >
              HIPAA compliant
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
