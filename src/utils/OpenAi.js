import OpenAI from 'openai';
import { OPENAI_API_KEY } from "../utils/Constants"

const OpenAi = new OpenAI({
  apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true 
});

export default OpenAi