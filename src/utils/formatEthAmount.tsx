export default function formatEthAmount(amount: string) {
  return parseFloat(amount).toFixed(3);
}