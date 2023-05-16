import axios from "axios"
import { ProbabilityDto } from "../Dtos/ProbabilityDto"
export function getPostProbability(probabilityDto: ProbabilityDto | null) {
    return axios
      .post(`https://localhost:7086/api/Probability/CalculateProbability`,
        probabilityDto)
      .then(res => res.data)     
  }
  