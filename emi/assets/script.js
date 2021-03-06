<script>

        
        var emi = {
            for_month: true,
            principal_amount: 0,
            roi : 0,
            tenureY : 0,
            tenureM :0,
            monthly_emi :0,
            total_amount_with_interest: 0,
            total_interest:0,
            yearly_amount_to_pay:0,

            validateInput: function(){
                this.principal_amount= document.getElementById("amount").value;
                this.roi = document.getElementById("roi").value;
                this.tenureY = document.getElementById("tenure").value;

                var amountPattern = /^[0-9]+$/;
                var roiPattern = /^[0-9]+[\.]*[0-9]*$/;
                var tenurePattern = /^[0-9]*[\.]*[0-9]+$/;
                
                if(this.principal_amount == '' || this.roi =='' || this.tenureY==''){
                    document.write("Kindly fill complete details");
                }
                else if(!amountPattern.test(this.principal_amount)){
                    document.write("Please give valid amount");
                }
                else if(!roiPattern.test(this.roi)){
                    document.write("Please give valid rate of interest");
                }
                else if(!tenurePattern.test(this.tenureY)){
                    document.write("Please give valid tenure(in year)");
                }
                else{
                    
                    return "Submitted Sucessfully";
                }

            },
            calculatemonth: function(){
                if(this.validateInput()){
                    this.tenureM = Math.round(this.tenureY*12);
                    var r = this.roi/12/100;
                    var x = 1+r;
                    var num = Math.pow(x,this.tenureM);
                    var deno = num-1;
                    this.monthly_emi = Math.round(this.principal_amount*r*num/deno);
                    this.yearly_amount_to_pay = this.monthly_emi*12;
                    this.total_amount_with_interest = this.monthly_emi*this.tenureM;
                    this.total_interest = this.total_amount_with_interest - this.principal_amount;

                    if(this.for_month){
                        this.createTable('month',this.monthly_emi,this.total_amount_with_interest, this.tenureM);
                    }
                    return true;
                }
                else{
                    return false;
                }
                
            },
            calculateyear: function(){
                this.for_month = false;
                if(this.calculatemonth()){
                    
                    this.createTable('year', this.yearly_amount_to_pay,this.total_amount_with_interest, this.tenureY);
                }
            },
            calculatetotal: function(){
                this.for_month = false;
                if(this.calculatemonth()){
                    
                    this.createTable('total',this.total_amount_with_interest, this.total_interest, this.principal_amount);
                }
            },
            createTable: function(){
                var table ='';
                var rows = 0;
                var cols = 0;

                if(arguments[0]=='total'){
                    
                    table+='<thead>'
                        table += '<tr>';
                            table+='<th>'+"Principal Amount"+'</th>';  
                            table+='<th>'+"Total Amount With Interest"+'</th>'; 
                            table+='<th>'+"Total Interest"+'</th>';   
                        table += '</tr>';
                    table+='</thead>'

                    table+='<tbody>'
                        table += '<tr>';
                            table+='<td>'+arguments[3]+'</td>';  
                            table+='<td>'+arguments[1]+'</td>'; 
                            table+='<td>'+arguments[2]+'</td>';   
                        table += '</tr>';
                    table+='</tbody>'
                    document.write('<table>' + table + '</table>');
                    
                }
                else if(arguments[0]=='year'){
                    
                    var rows = arguments[3]; 
                    var year_pay = arguments[1];
                    var amount_remaining = arguments[2] - year_pay;
                    
                    table += '<tr>';
                        table+='<td>'+"Principal Amount: "+this.principal_amount+'<td>';  
                        table+='<td>'+"Total Payable Amount: "+this.total_amount_with_interest+'<td>'; 
                        table+='<td>'+"Total Interest : "+this.total_interest+'<td>';   
                    table += '</tr>';
                    table += '<tr>';
                        table+='<td>'+"Year"+'<td>';  
                        table+='<td>'+"Amount Paid in current year"+'<td>'; 
                        table+='<td>'+"Amount Reamining"+'<td>';   
                    table += '</tr>';
                    for(var r=0;r<rows;r++){
                        table += '<tr>';
                            table+='<td>'+"Year "+(r+1)+'<td>'; 
                            table+='<td>'+year_pay+'<td>'; 
                            table+='<td>'+amount_remaining+'<td>'; 
                            amount_remaining = amount_remaining - year_pay;
                        table += '</tr>';
                    }
                    document.write('<table>' + table + '</table>');
                }
                else{
                   
                    var rows = arguments[3]; 
                    var month_pay = arguments[1];
                    var amount_remaining = arguments[2] - month_pay;
                    table += '<tr>';
                        table+='<td>'+"Principal Amount: "+this.principal_amount+'<td>';  
                        table+='<td>'+"Total Payable Amount  : "+this.total_amount_with_interest+'<td>'; 
                        table+='<td>'+"Total Interest : "+this.total_interest+'<td>';   
                    table += '</tr>';
                    table += '<tr>';
                        table+='<td>'+"Month"+'<td>';  
                        table+='<td>'+"Amount Paid current month"+'<td>'; 
                        table+='<td>'+"Amount Reamining"+'<td>';   
                    table += '</tr>';
                    for(var r=0;r<rows;r++){
                        table += '<tr>';
                            table+='<td>'+"Month "+(r+1)+'<td>'; 
                            table+='<td>'+month_pay+'<td>'; 
                            table+='<td>'+amount_remaining+'<td>'; 
                            amount_remaining = amount_remaining - month_pay;
                        table += '</tr>';
                    }
                    document.write('<table>' + table + '</table>');

                }
            }
        
    </script>
