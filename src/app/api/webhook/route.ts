import crypto from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";
import {} from "@lemonsqueezy/lemonsqueezy.js";

// A POST request :
// {
//   "data": {
//     "id": "2973961",
//     "type": "subscription-invoices",
//     "links": {
//       "self": "https://api.lemonsqueezy.com/v1/subscription-invoices/2973961"
//     },
//     "attributes": {
//       "tax": 0,
//       "urls": {
//         "invoice_url": "https://app.lemonsqueezy.com/my-orders/5719aea7-2311-4e04-a052-f34ee2b51e49/subscription-invoice/2973961?expires=1743450270&signature=58d1b58a7df0e0437d476190d6b7855c0b10bd1c7ca3ecb10b0c7491356a5237"
//       },
//       "total": 999,
//       "status": "paid",
//       "tax_usd": 0,
//       "currency": "EUR",
//       "refunded": false,
//       "store_id": 166134,
//       "subtotal": 999,
//       "test_mode": true,
//       "total_usd": 1079,
//       "user_name": "vingt-douze",
//       "card_brand": "visa",
//       "created_at": "2025-03-31T13:44:27.000000Z",
//       "updated_at": "2025-03-31T13:44:30.000000Z",
//       "user_email": "vingt-douze@protonmail.com",
//       "customer_id": 5415857,
//       "refunded_at": null,
//       "subtotal_usd": 1079,
//       "currency_rate": "1.08049002",
//       "tax_formatted": "€0.00",
//       "tax_inclusive": false,
//       "billing_reason": "initial",
//       "card_last_four": "4242",
//       "discount_total": 0,
//       "refunded_amount": 0,
//       "subscription_id": 1089014,
//       "total_formatted": "€9.99",
//       "status_formatted": "Paid",
//       "discount_total_usd": 0,
//       "subtotal_formatted": "€9.99",
//       "refunded_amount_usd": 0,
//       "discount_total_formatted": "€0.00",
//       "refunded_amount_formatted": "€0.00"
//     },
//     "relationships": {
//       "store": {
//         "links": {
//           "self": "https://api.lemonsqueezy.com/v1/subscription-invoices/2973961/relationships/store",
//           "related": "https://api.lemonsqueezy.com/v1/subscription-invoices/2973961/store"
//         }
//       },
//       "customer": {
//         "links": {
//           "self": "https://api.lemonsqueezy.com/v1/subscription-invoices/2973961/relationships/customer",
//           "related": "https://api.lemonsqueezy.com/v1/subscription-invoices/2973961/customer"
//         }
//       },
//       "subscription": {
//         "links": {
//           "self": "https://api.lemonsqueezy.com/v1/subscription-invoices/2973961/relationships/subscription",
//           "related": "https://api.lemonsqueezy.com/v1/subscription-invoices/2973961/subscription"
//         }
//       }
//     }
//   },
//   "meta": {
//     "test_mode": true,
//     "event_name": "subscription_payment_success",
//     "webhook_id": "3c48e388-e9db-4823-b6c5-3659957fd0cc"
//   }
// }

export async function POST(request: NextRequest) {
	const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

	if (!secret) {
		return NextResponse.json("Required env secrets not set!", { status: 400 });
	}

	const rawBody = await request.text();
	const signature = Buffer.from(request.headers.get("X-Signature") ?? "", "hex");

	if (signature.length === 0 || rawBody.length === 0) {
		return NextResponse.json("Invalid request", { status: 400 });
	}

	const hmac = Buffer.from(
		crypto.createHmac("sha256", secret).update(rawBody).digest("hex"),
		"hex"
	);

	if (!crypto.timingSafeEqual(hmac, signature)) {
		return NextResponse.json("Invalid request", { status: 400 });
	}

	const data = JSON.parse(rawBody);

	const eventName = data.meta.event_name;
	const attributes = data.data.attributes;
	const id = data.data.id;

	return NextResponse.json("OK", { status: 200 });
}
