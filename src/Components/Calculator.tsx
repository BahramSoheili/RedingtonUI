import { useEffect, useState } from "react";
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPostProbability } from "../api/Posts";
import { ProbabilityDto } from "../Dtos/ProbabilityDto";
import { CalculatorStyles, TextFieldStyles } from "./Calculator.styles";


export default function Calculator() {
    const [firstProbability, setFirstProbability] = useState<null | number>(null);
    const [secondProbability, setSecondProbability] = useState<null | number>(null);
    const [probabilityType, setProbabilityType] = useState<number>(0);
    const [probabilityDto, setprobabilityDto] = useState<ProbabilityDto | null>(null)
    const [isCalculation, setCalculation] = useState(false);
    const [result, setResult] = useState('');

    result
    useEffect(() => {
        let probabilityDto: ProbabilityDto  =
        {
            FirstProbability: firstProbability,
            SecondProbability: secondProbability,
            ProbabilityType: probabilityType
        }
        setprobabilityDto(probabilityDto)  
        if(firstProbability &&  secondProbability){
            setCalculation(true)
        }    
      }, [firstProbability, secondProbability, probabilityType])  
    const handleChangeFirstProbability = (event: any) => {
        setFirstProbability(event.target.value as number);
      };
      const handleChangeSecondProbability = (event: any) => {
        setSecondProbability(event.target.value as number);     
     };
      const handleChangeProbability = (event: any) => {
        setProbabilityType(event.target.value as number);      
    };
    const handleCalculate = () => {      
        refetch()   
      };
    const { status, data, refetch: refetch } = useQuery({
        queryKey: ["posts", { probabilityDto }],
        keepPreviousData: true,
        queryFn: () => getPostProbability(probabilityDto),
        refetchOnWindowFocus: false,
        enabled: false        
      })
      useEffect(() => {     
        if(data){
            console.log(data.probability.probability)
            setResult(data.probability.probability.toString())
        } 
        else if(status === "error") {
            setResult('Error')
        }   
      }, [data, status])  
    return (
        <Box sx={CalculatorStyles}>
            <TextField sx={TextFieldStyles}
            onChange={handleChangeFirstProbability} 
            id="First" label= "First Probability" 
            variant="outlined" 
            />
            <TextField sx={TextFieldStyles}
            onChange={handleChangeSecondProbability} 
            id="Second" 
            label= "Second Probability" 
            variant="outlined" 
            />
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    onChange={handleChangeProbability}
                    defaultValue="0"
                >
                    <FormControlLabel value = "0" control={<Radio />} label="CombinedWith" />
                    <FormControlLabel value = "1" control={<Radio />} label="Either" />
                </RadioGroup>
            </FormControl>            
            <Button disabled = {!isCalculation} onClick={handleCalculate} variant="outlined">Calculate</Button>
            <h4>{result}</h4>
        </Box>
    );
  }