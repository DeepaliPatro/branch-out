import { Router } from "express";
const router = Router();
import { Plant } from "../db/models/plant.model";


// import { plants } from "../db/seed_data_plants";


// router.get("/seed", (req, res) => {
//     Plant.countDocuments()
//         .then(plantsCount => {
//             if(plantsCount > 0){
//               res.send("Seed is already done!");
//               return;
//             }
//         })
   
//        Plant.create(plants)
//         .then(dbRes => res.send("Seed Is Done!"))
//    }
// )

router.get('/', async (req, res) => {
  const plants = await Plant.find();
  res.json(plants);
})

router.get("/search/:searchTerm", async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const plants = await Plant.find({name: {$regex:searchRegex}})
    res.send(plants);
})

router.get("/tags", async (req, res) => {
  const tags = await Plant.aggregate([
    {
      $unwind:'$tags'
    },
    {
      $group:{
        _id: '$tags',
        count: {$sum: 1}
      }
    },
    {
      $project:{
        _id: 0,
        name:'$_id',
        count: '$count'
      }
    }
  ]).sort({count: -1});

  const all = {
    name : 'All',
    count: await Plant.countDocuments()
  }

  tags.unshift(all);
  res.send(tags);
})

router.get("/tag/:tagName", async (req, res) => {
    const plants = await Plant.find({tags: req.params.tagName})
    res.send(plants);
})

router.get('/:plantId', async (req, res) => {
  const plant = await Plant.findById(req.params.plantId);
  res.json(plant);
})


export default router
   