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
        name: { type: String, required: true },
        description: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema);

//-----------------------------------------------------------------------


const PaymentSchema = new Schema(
    {
        customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
        dt: { type: Date, required: true },
        cashtypeId: { type: Schema.Types.ObjectId, ref: 'Cashtype' },
        bank: { type: String, required: true },
        chequeNo: { type: String, required: true },
        chequeDt: { type: String, required: true },
        taka: { type: Number, required: true },
        isDeleted: { type: Boolean, default: false }
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
        shortName: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }
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
        note: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

export const SalaryModel = mongoose.models.Salary || mongoose.model("Salary", SalarySchema);


//-----------------------------------------------------------------------------------------

const UnittypeSchema = new Schema(
    {
        name: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }
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
        taka: { type: Number, required: true },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

export const LcModel = mongoose.models.Lc || mongoose.model("Lc", LcSchema);



//-----------------------------------------------------------------------------------------

const ShipmentSchema = new Schema(
    {
        dt: { type: Date, required: true },
        shipmentNo: { type: String, required: true },
        lcId: { type: Schema.Types.ObjectId, ref: 'Lc' },
        supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
        itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
        unittypeId: { type: Schema.Types.ObjectId, ref: 'Unittype' },
        qty: { type: Number, required: true },
        taka: { type: Number, required: true },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

export const ShipmentModel = mongoose.models.Shipment || mongoose.model("Shipment", ShipmentSchema);



//----------------------------------------------------------------------------------------------------

const MoneyreceiptSchema = new Schema(
    {
        dt: { type: String, required: true },
        receiveNo: { type: String, required: true },
        receivedFrom: { type: String, required: true },
        taka: { type: String, required: true },
        cashtypeId: { type: Schema.Types.ObjectId, ref: 'Cashtype' },
        bankName: { type: String, required: true },
        chequeNo: { type: String, required: true },
        chequeDt: { type: String, required: true },
        purpose: { type: String, required: true },
        contact: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

export const MoneyreceiptModel = mongoose.models.Moneyreceipt || mongoose.model("Moneyreceipt", MoneyreceiptSchema);




const SaleSchema = new Schema(
    {
        customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
        shipment: { type: Number, required: true },
        itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
        dt: { type: Date, required: true },
        bale: { type: Number, required: true },
        than: { type: Number, required: true },
        meter: { type: Number, required: true },
        weight: { type: Number, required: true },
        rate: { type: Number, required: true },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

export const SaleModel = mongoose.models.Sale || mongoose.model("Sale", SaleSchema);

//-----------------------------------------------------------------------------


const InvoiceSchema = new Schema(
    {
        invoiceNumber: { type: Number, required: true },
        customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
        dt: { type: Date, required: true },
        shipment: { type: Number, required: true },
        deduct: { type: Number, required: true },
        payment: { type: Number, required: true },
        items: [{ id: Number, itemName: String, bale: Number, than: Number, meter: Number, weight: Number, taka: Number }],
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

export const InvoiceModel = mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);

//---------------------------------------------------------------------------------------------------
const BorrowerSchema = new Schema(
    {
        name: { type: String, required: true },
        contact: { type: String, required: true },
        remarks: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }      
    },
    {
        timestamps: true
    }
);

export const BorrowerModel = mongoose.models.Borrower || mongoose.model("Borrower", BorrowerSchema);  

//--------------------------------------------------------------------------------------------------

const LoanSchema = new Schema(
    {
        borrowerId: { type: Schema.Types.ObjectId, ref: 'Borrower' },
        dt: { type: Date, required: true },
        taka: { type: Number, required: true },
        remarks: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }      
    },
    {
        timestamps: true
    }
);

export const LoanModel = mongoose.models.Loan || mongoose.model("Loan", LoanSchema);  










