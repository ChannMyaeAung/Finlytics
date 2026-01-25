import axios from "axios";
import { type Request, type Response } from "express";

const FX_BASE_URL = "https://api.frankfurter.dev/v1";

// Get all currencies (symbols)
export const getCurrencySymbols = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(`${FX_BASE_URL}/currencies`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch currency symbols." });
  }
};

// Convert currency
export const convertCurrency = async (req: Request, res: Response) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res
      .status(400)
      .json({ error: "Missing required query parameters: from, to, amount." });
  }

  try {
    const { data } = await axios.get(`${FX_BASE_URL}/latest`, {
      params: {
        from,
        to,
        amount,
      },
    });

    const rate = data?.rates?.[to as string];

    res.json({
      result: rate ?? null,
      rate: rate ?? null,
      date: data?.date,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to convert currency." });
  }
};
