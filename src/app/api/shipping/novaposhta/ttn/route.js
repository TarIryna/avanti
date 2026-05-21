import Order from "@/models/order";

export const PUT = async (request) => {
  try {
    const body = await request.json();
    const data = body.data;

    const phone = `38${data?.phone?.replace(/\D/g, "")}`;

    // =========================
    // CREATE RECIPIENT
    // =========================

    const paramsRecipient = {
      apiKey: process.env.NOVA_POSHTA_API_KEY,
      modelName: "Counterparty",
      calledMethod: "save",
      methodProperties: {
        FirstName: data.name,
        LastName: data.surname,
        MiddleName: "",
        Phone: phone,

        CounterpartyType: "PrivatePerson",
        CounterpartyProperty: "Recipient",
      },
    };

    const responseRecipient = await fetch(
      "https://api.novaposhta.ua/v2.0/json/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paramsRecipient),
      }
    );

    const resultRecipient = await responseRecipient.json();

    if (!resultRecipient.success) {
      console.log(resultRecipient);

      return new Response(
        JSON.stringify({
          error: "Recipient creation failed",
          details: resultRecipient,
        }),
        { status: 400 }
      );
    }

    const recipientRef = resultRecipient?.data?.[0]?.Ref;

    // =========================
    // CREATE CONTACT PERSON
    // =========================

      const paramsContactRecipient = {
        apiKey: process.env.NOVA_POSHTA_API_KEY,
        modelName: "ContactPerson",
        calledMethod: "save",
        methodProperties: {
          CounterpartyRef: recipientRef,
          FirstName: data.name,
          LastName: data.surname,
          MiddleName: "",
          Phone: phone,
        },
      }

    const responseContact = await fetch(
      "https://api.novaposhta.ua/v2.0/json/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paramsContactRecipient),
      }
    );

    const resultContact = await responseContact.json();

    if (!resultContact.success) {
      console.log(resultContact);

      return new Response(
        JSON.stringify({
          error: "Contact creation failed",
          details: resultContact,
        }),
        { status: 400 }
      );
    }

    const contactRecipientRef = resultContact?.data?.[0]?.Ref;

    // =========================
    // CREATE WAYBILL
    // =========================

    const params = {
      apiKey: process.env.NOVA_POSHTA_API_KEY,
      modelName: "InternetDocument",
      calledMethod: "save",
      methodProperties: {
        PayerType: "Recipient",
        PaymentMethod: "Cash",
        DateTime: new Date().toLocaleDateString("uk-UA"),
        CargoType: "Parcel",
        Weight: "2",
        ServiceType: "WarehouseWarehouse",
        SeatsAmount: String(data.items || 1),

        Sender: "3d6a1bb1-5103-11f0-a1d5-48df37b921da",
        SenderAddress: "a9f834ab-e9be-11e4-8a92-005056887b8d",
        SendersPhone: "380506927217",
        ContactSender: "5cf486c6-5103-11f0-a1d5-48df37b921da",

        Recipient: recipientRef,
        ContactRecipient: contactRecipientRef,
        RecipientAddress: data.address,
        RecipientsPhone: phone,

        CitySender: "e221d627-391c-11dd-90d9-001a92567626",
        CityRecipient: data.city,
        Description: "Взуття",
        Cost: String(data.cost || 0),

        ...(data.payment > 0 && {
          AfterpaymentOnGoodsCost: String(data.payment),
        }),
      },
    };

    const response = await fetch(
      "https://api.novaposhta.ua/v2.0/json/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );

    const result = await response.json();

    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: "TTN creation failed",
          details: result,
        }),
        { status: 400 }
      );
    }
    
    await Order.updateOne(
      { _id: data.orderId },
      {
        $set: {
          ttn: result?.data?.[0],
          status: "delivery"
        },
      }
    );

    return new Response(JSON.stringify("205022332155"), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
      }),
      {
        status: 500,
      }
    );
  }
};

