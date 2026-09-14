 import mongoose, { Types } from "mongoose";

 const subscribtionschema = new mongoose.schema(
    {
     name:{
        type:String,
        required:true,
        trim: true,
        minLength:2,
        maxLength:100,

    },
    
    
    price:{
        type:Number,
        required:[true, 'subscription price is required'],
        min:[0,'price must be greater than 0'],
        max:[1000,'price must be less than 1000'],

        
    },

    currency:{
        type:String,
        emnu:['birr','USD'],
        default:'birr'

    },
    frequency:{
        type:String,
        emu:['daily','weekly','monthly','yearly'],

    },

    category:{
        type:String,
        enum:['news','lifestyle','tech'],
        require: true,
    },
    paymentMethod:{
        type:String,
        required:true,
        trim: true,
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
       
    },
     StartDate:{
        type:Date,
        required:true,
        validator:(value)=> value <= new Date,
        message:'start date be in the past'
     },
     
     renewalDate:{
        type:Date,
        required:true,
        validator: function (value){
            return value>this.StartDate;
        },
        message:'renewal date must be after the start date '
     
     },

     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
     }
    
    
    },
     
     
     
     
     {timestamps:true});


     subscribtionschema.pre ('save', function(next)
    {

if(!this.renewalDate){
    const renewalperiods={
        daily:1,
        weekly:7,
        monthly:30,
        yearly:365,
    };
    this.renewalDate=new Date(this.StartDate);
    this.renewalDate.setDate(this.renewalDate.getDate()+ renewalperiods[this.frequency]);
}

if(this.renewalDate < new Date()){
    this.status='expired'
}
next();

    })


    const Subscription = mongoose.model('Subscription',  subscribtionschema );

    export default Subscription;



 
 
 
 
 