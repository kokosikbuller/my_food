class MonoClient {
  async createInvoice(payload: any) {
    const res = await fetch(
      "https://api.monobank.ua/api/merchant/invoice/create",
      {
        method: "POST",
        headers: {
          "X-Token": process.env.MONO_TOKEN!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    
    if (!res.ok) {
      const errorBody = await res.text();
      console.log('errorBody', errorBody);

      throw new Error(errorBody);
    }

    return res.json();
  }
}

export const monoClient = new MonoClient();