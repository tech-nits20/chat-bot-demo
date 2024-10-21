import chatData from "../../../assets/stock.data.json";

interface OptionData {
  header: string;
  option?: string[];
}
export const analyzeChatOptions = (
  step: number,
  userResponse: string
): OptionData => {
  const stockPrice = chatData.find(item => item.topStocks)?.topStocks.find(res => res.stockName === userResponse);
  return step === 0
    ? {
        header: "Please select a Stock Exchange.",
        option: chatData.map((item) => item.stockExchange),
      }
    : step === 2
    ? {
        header: "Please select a Stock.",
        option:
          chatData
            .find((item) => item.stockExchange === userResponse)
            ?.topStocks.map((res) => res.stockName) ?? [],
      }
    : step === 3
    ? {
        header: `Stock price of ${stockPrice?.stockName} is ${stockPrice?.price}. Please select an option.`,
      }
    : { header: "", option: [] };
};
