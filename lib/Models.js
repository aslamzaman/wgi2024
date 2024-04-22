import mongoose, { Schema } from "mongoose";


const CashtypeSchema = new Schema(
    {
        name: String
    },
    {
        timestamps: true
    }
);

export const CashtypeModel = mongoose.models.Cashtype || mongoose.model("Cashtype", CashtypeSchema);


//-----------------------------------------------------------------------


const CustomerSchema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        contact: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }       
    },
    {
        timestamps: true
    }
);

export const CustomerModel = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);  




//-----------------------------------------------------------------------

const EmployeeSchema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        postId: { type: Schema.Types.ObjectId, ref: 'Post' },
        salary: { type: Number, required: true },
        joinDt: { type: Date, required: true },
        contact: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }       
    },
    {
        timestamps: true
    }
);

export const EmployeeModel = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);  

//-----------------------------------------------------------------------

const ItemSchema = new Schema(
    {
        name: String,
        description: String
    },
    {
        timestamps: true
    }
);

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema);

//-----------------------------------------------------------------------

const PaymentSchema = new Schema(
    {
        customerObject:  { _id: String, name: String, address: String, contact: String },
        dt: { type: String, required: true },
        cashtypeObject: { _id: String, name: String },
        bank: { type: String, required: true },
        taka: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const PaymentModel = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);  

//-----------------------------------------------------------------------

const PostSchema = new Schema(
    {
        name: { type: String, required: true },
        shortName: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);  

//-----------------------------------------------------------------------

const SupplierSchema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        contact: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }       
    },
    {
        timestamps: true
    }
);

export const SupplierModel = mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema);    

//-----------------------------------------------------------------------


const UserSchema = new Schema(
    {
        user_name: String,
        pw: String
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);


//------------------------------------------------------------------------------------


const SalarySchema = new Schema(
    {
        employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
        month: { type: String, required: true },
        taka: { type: Number, required: true },
        deduct: { type: Number, required: true },
        arear: { type: Number, required: true },
        note: { type: String, required: true }       
    },
    {
        timestamps: true
    }
);

export const SalaryModel = mongoose.models.Salary || mongoose.model("Salary", SalarySchema);  


//-----------------------------------------------------------------------------------------

const UnittypeSchema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const UnittypeModel = mongoose.models.Unittype || mongoose.model("Unittype", UnittypeSchema);


//------------------------------------------------------------------------------------------------------


const LcSchema = new Schema(
    {
        dt: { type: Date, required: true },
        lcNo: { type: String, required: true },
        qty: { type: Number, required: true },
        unittypeId: { type: Schema.Types.ObjectId, ref: 'Unittype' },
        taka: { type: Number, required: true }       
    },
    {
        timestamps: true
    }
);

export const LcModel = mongoose.models.Lc || mongoose.model("Lc", LcSchema);  


//-----------------------------------------------------------------------------------------------------------

const OrderSchema = new Schema(
    {
        dt: { type: Date, required: true },
        deliveryDt: { type: Date, required: true },
        orderNo: { type: Number, required: true },
        customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
        items: [{ name: String, description: String, qty: Number, unit: String, taka: Number }]
    },
    {
        timestamps: true
    }
);

export const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);



//-----------------------------------------------------------------------------------------


const ShipmentSchema = new Schema(
    {
        dt: { type: Date, required: true },
        shipmentNo: { type: String, required: true },
        lcId: {type: Schema.Types.ObjectId, ref: 'Lc' },
        supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
        itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
        unittypeId: { type: Schema.Types.ObjectId, ref: 'Unittype' },
        qty: { type: Number, required: true },
        taka: { type: Number, required: true }       
    },
    {
        timestamps: true
    }
);

export const ShipmentModel = mongoose.models.Shipment || mongoose.model("Shipment", ShipmentSchema);  



//--------------------------------------------------------------------------------

const DeliverySchema = new Schema(
    {
        dt: { type: Date, required: true },
        invoiceNo: { type: Number, required: true },
        orderNo: { type: Number, required: true },
        orderDt: { type: Date, required: true },
        shipment: { type: Number, required: true },
        deduct: { type: Number, required: true },
        payment: { type: Number, required: true },
        customer: { _id: String, name: String, address: String, contact: String },
        items: [{ name: String, description: String, qty: Number, unit: String, taka: Number }]
    },
    {
        timestamps: true
    }
);


export const DeliveryModel = mongoose.models.Delivery || mongoose.model("Delivery", DeliverySchema);


//----------------------------------------------------------------------------------------------------

const MoneyreceiptSchema = new Schema(
    {
        dt: { type: Date, required: true },
        receiveNo: { type: Number, required: true },
        receivedFrom: { type: String, required: true },
        taka: { type: Number, required: true },
        cashType: { type: String, required: true },
        bankName: { type: String, required: true },
        chequeNo: { type: String, required: true },
        chequeDt: { type: Date, required: true },
        purpose: { type: String, required: true },
        contact: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const MoneyreceiptModel = mongoose.models.Moneyreceipt || mongoose.model("Moneyreceipt", MoneyreceiptSchema);










