import { v4 as uuid } from 'uuid';

export const medicines_list = [
  {
    id: uuid(),
    name: 'Giảm đau hạ sốt',
    parent_id: 1,
    medicines: [
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Tylenol 650mg',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      },
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Hapacol codein 500mg',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      },
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Brexin 20mg',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      },
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Meloxicam stada 7.5mg',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      },
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Panadol extra 500mg',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      },
    ]
  },
  {
    id: uuid(),
    name: 'Tim mạch',
    parent_id: 1,
    medicines: [
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Propanolol/ Dorocardyl 40mg',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      },
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Synapain (Pregabalin 75mg)',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      },
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Concor 5mg',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      },
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Clopidogrel 75mg (Clopistad 75mg)',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      }
    ]
  },
  {
    id: uuid(),
    name: 'Thần kinh',
    parent_id: 1,
    medicines: [
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Topamax 50 mg',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      },
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Topamax 25 mg',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      },
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Zoloft 50mg',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      },
      {
        id: uuid(),
        unit: 'Viên',
        name: 'Deparkin 500mg Chrono',
        quantity: 10,
        price: 10000,
        use: 'Sáng: 0 viên - Trưa 0 viên - Chiều 0 viên',
        description:null
      }
    ]
  },
];
