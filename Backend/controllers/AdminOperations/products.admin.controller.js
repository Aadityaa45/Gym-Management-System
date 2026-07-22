import productModel from "../../models/product.models.js";
import { appAssert } from "../../utils/errorAssertion.utils.js"
import { AppError } from "../../utils/errorAssertion.utils.js";
import GymDetails from "../../models/gym.modals.js";
import EmailService from "../../services/email.service.js";


//--------------------------------------------------- THIS IS THE CONTROLLER TO ADD NEW PRODUCT---------------------------------------
export const addNewProduct = async (req,res) =>{
    try {
        console.log(1)
        const gymId = req.gym.gymId //getting the gym id from the token
        console.log(2)
        const gymExist = await GymDetails.findById(gymId)
        console.log(3)

        console.log(4)
        appAssert(gymExist,"Gym Not Found! Please Login Again!")
        console.log(5)

        console.log(6)
        const {
            name,
            description,
            status,
            quantity,
            price,
            wholeSalePrice,
            category,
            image,
            priorityOrder
        } = req.body   //getting this details from the frontend 
        console.log(7)

        //validation part 
        console.log(8)
        appAssert(name,"Name of the product is required!!")
        console.log(9)

        console.log(10)
        appAssert(Number(quantity)>0 && Number(quantity)<1000, "Quantity should be valid Number between 1 to 1000 and can not be empty!!")
        console.log(11)

        console.log(12)
        appAssert(Number(price)>10,"Price should atleast greater than 10")
        console.log(13)

        console.log(14)
        appAssert(Number(wholeSalePrice)>10,"Wholesale price should be greater than 10")
        console.log(15)

        console.log(16)
        //checking weather the product with same name and category exists or not 
        const productExist = await productModel.findOne({
            gym:gymId,
            name,
            category
        })
        console.log(17)
        appAssert(!productExist,"Product with same name and category exists!!")
        console.log(18)

        console.log(19)
        //now we will save the new product into the database
        const newProduct = new productModel({
            name,
            description,
            status,
            quantity,
            price,
            wholeSalePrice,
            category,
            image,
            priorityOrder,
            gym:gymId
        })
        await newProduct.save()
        console.log(20)

        //returning reponse before as sending email lead to 1-3 seconds delay
        res.json({
        success:true,
        message:"New Product Added Successfully!!"
    })
        //till here the product is updated in the database now we will send email to owner 
        console.log(21)
        const gymOwner = await GymDetails.findById(gymId).select("ownerEmail gymName")
        console.log(22)
        await EmailService.sendEmail({
    to: gymOwner.ownerEmail,
    subject: `🛍️ New Product Added Successfully | ${gymOwner.gymName}`,

    html: `
    <div style="margin:0;padding:40px;background:#f4f7fb;font-family:Segoe UI,Tahoma,sans-serif;">
        
        <div style="max-width:700px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">

            <div style="background:#0f172a;padding:28px;text-align:center;">
                <h1 style="margin:0;color:white;font-size:28px;">
                    Product Successfully Added
                </h1>
                <p style="margin-top:10px;color:#cbd5e1;">
                    Gym Inventory Management System
                </p>
            </div>

            <div style="padding:35px;">

                <h2 style="margin-top:0;color:#111827;">
                    Hello ${gymOwner.gymName},
                </h2>

                <p style="color:#4b5563;font-size:15px;line-height:1.8;">
                    We are pleased to inform you that a new product has been successfully
                    added to your gym inventory. The product is now available inside your
                    dashboard and can be managed, restocked or sold anytime.
                </p>

                <table style="width:100%;border-collapse:collapse;margin-top:30px;">

                    <tr>
                        <td style="padding:12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;">Product Name</td>
                        <td style="padding:12px;border:1px solid #e5e7eb;">${name}</td>
                    </tr>

                    <tr>
                        <td style="padding:12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;">Category</td>
                        <td style="padding:12px;border:1px solid #e5e7eb;">${category}</td>
                    </tr>

                    <tr>
                        <td style="padding:12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;">Available Quantity</td>
                        <td style="padding:12px;border:1px solid #e5e7eb;">${quantity} Units</td>
                    </tr>

                    <tr>
                        <td style="padding:12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;">Selling Price</td>
                        <td style="padding:12px;border:1px solid #e5e7eb;">₹${price}</td>
                    </tr>

                    <tr>
                        <td style="padding:12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;">Wholesale Price</td>
                        <td style="padding:12px;border:1px solid #e5e7eb;">₹${wholeSalePrice}</td>
                    </tr>

                    <tr>
                        <td style="padding:12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;">Status</td>
                        <td style="padding:12px;border:1px solid #e5e7eb;text-transform:capitalize;">
                            ${status}
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:12px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:600;">Priority</td>
                        <td style="padding:12px;border:1px solid #e5e7eb;">
                            ${priorityOrder ?? 0}
                        </td>
                    </tr>

                </table>

                ${
                    description
                        ? `
                    <div style="margin-top:30px;">
                        <h3 style="margin-bottom:10px;color:#111827;">Description</h3>

                        <div style="background:#f9fafb;padding:18px;border-radius:8px;border:1px solid #e5e7eb;color:#4b5563;">
                            ${description}
                        </div>
                    </div>
                `
                        : ""
                }

                <div
                    style="
                        margin-top:35px;
                        background:#ecfdf5;
                        border-left:5px solid #10b981;
                        padding:18px;
                        border-radius:8px;
                    "
                >
                    <strong style="color:#065f46;">
                        ✅ Product Added Successfully
                    </strong>

                    <p style="margin-top:8px;color:#047857;">
                        This product is now available in your inventory and can be sold,
                        edited, or restocked directly from your dashboard.
                    </p>
                </div>

                <p style="margin-top:35px;color:#6b7280;font-size:14px;">
                    Thank you for choosing our Gym Management System to manage your inventory efficiently.
                </p>

                <hr style="margin:35px 0;border:none;border-top:1px solid #e5e7eb;">

                <p style="font-size:13px;color:#9ca3af;text-align:center;">
                    © ${new Date().getFullYear()} Gym Management System • Inventory Module
                </p>

            </div>

        </div>

    </div>
    `
})  

    } catch (error) {
        if (error instanceof AppError) {
            return res.json({success: false, message:error.message});
        }
        return res.json({success: false, message:"An error occured while Adding a new Product in!"});
    }
}



//----------------------------------------------------------THIS IS THE CONTROLLER FOR SEARCHING ABOUT THE PRODUCTS BASED ON DIFFERENT PARAMETERS---------------------------------------------
export const searchProducts = async (req,res) =>{
    try {
        const page = Math.max(Number(req.query.page)||1,1)
        const limit = Number(req.query.limit) || 8
        const search = req.query.search

        const skip = (page-1)*limit

        //now lets fetch the basic gymid and all
        const gymId = req.gym.gymId

        appAssert(gymId,"No Authorized!!")

        //lets create the basic filter by which we will find the results 
        let filter = {
            gym:gymId
        }

        //if search parameter is there in the query
        if(search && search.trim()){
            filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                category: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
     }

        //now we will call serch through db with the filters we created
        const [searchResults,totalProducts] = await Promise.all([
            productModel.find(filter).skip(skip).limit(limit).sort({
                priorityOrder:1,
                createdAt:-1
            }).lean(),  //usually when we fetch documents in mongo ut creates the mongoose document and it additionally give lots of getters and setters like .save() .remove() but here we only need the plain js object so it optimises our performance 
            productModel.countDocuments(filter)
        ])

        appAssert(searchResults,"No results found!!")

        return res.json({
            success:true,
            searchResults,
            pagination:{
                totalProducts,
                totalPages : Math.ceil(totalProducts/limit),
                pageSize :limit,
                currentPage:page
            },
        })

    } catch (error) {
        if (error instanceof AppError) {
            return res.json({success: false, message:error.message});
        }
        return res.json({success: false, message:"An error occured while Adding a new Product in!"});
    }
}




//----------------------------------------------------------THIS FUNCTIONALITY IS FOR THE SELL PRODUCT INVOICE GENERATION---------------------------------------------------