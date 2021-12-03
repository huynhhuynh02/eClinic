import { v4 as uuid } from 'uuid';

export const schedules = [
  {
    id: uuid(),
    date:'1996/01/11',
    time:'09:00',
    status: 0,
    doctors: [
        {
            id: uuid(),
            name: 'Bs. An'
        },
        {
            id: uuid(),
            name: 'Bs. Bình'
        }
    ],
    patient : {
        id: uuid(),
        address: 'Quận 3 - TP Đà Nẵng',
        avatarUrl: '/static/images/avatars/avatar_3.png',
        createdAt: 1555016400000,
        email: 'ekaterina.tankova@devias.io',
        name: 'Nguyen Van A',
        phone: '304-428-3097',
        birthday: '1996/01/11'
    }
  },
  {
    id: uuid(),
    date:'1996/01/11',
    time:'09:00',
    status: 1,
    doctors: [
        {
            id: uuid(),
            name: 'Bs. An'
        },
        {
            id: uuid(),
            name: 'Bs. Bình'
        }
    ],
    patient : {
        id: uuid(),
        address: 'Quận 3 - TP Đà Nẵng',
        avatarUrl: '/static/images/avatars/avatar_3.png',
        createdAt: 1555016400000,
        email: 'ekaterina.tankova@devias.io',
        name: 'Nguyen Van A',
        phone: '304-428-3097',
        birthday: '1996/01/11'
    }
  },
  {
    id: uuid(),
    date:'1996/01/11',
    time:'09:00',
    status: 0,
    doctors: [
        {
            id: uuid(),
            name: 'Bs. An'
        },
        {
            id: uuid(),
            name: 'Bs. Bình'
        }
    ],
    patient : {
        id: uuid(),
        address: 'Quận 3 - TP Đà Nẵng',
        avatarUrl: '/static/images/avatars/avatar_3.png',
        createdAt: 1555016400000,
        email: 'ekaterina.tankova@devias.io',
        name: 'Nguyen Van A',
        phone: '304-428-3097',
        birthday: '1996/01/11'
    },
    description: 'Bệnh nhân cao tuổi ưu tiên trước'
  },
  {
    id: uuid(),
    date:'1996/01/11',
    time:'09:00',
    status: 0,
    doctors: [
        {
            id: uuid(),
            name: 'Bs. An'
        },
        {
            id: uuid(),
            name: 'Bs. Bình'
        }
    ],
    patient : {
        id: uuid(),
        address: 'Quận 3 - TP Đà Nẵng',
        avatarUrl: '/static/images/avatars/avatar_3.png',
        createdAt: 1555016400000,
        email: 'ekaterina.tankova@devias.io',
        name: 'Nguyen Van A',
        phone: '304-428-3097',
        birthday: '1996/01/11'
    },
    description: ''
  },
  {
    id: uuid(),
    date:'1996/01/11',
    time:'09:00',
    status: 0,
    doctors: [
        {
            id: uuid(),
            name: 'Bs. An'
        },
        {
            id: uuid(),
            name: 'Bs. Bình'
        }
    ],
    patient : {
        id: uuid(),
        address: 'Quận 3 - TP Đà Nẵng',
        avatarUrl: '/static/images/avatars/avatar_3.png',
        createdAt: 1555016400000,
        email: 'ekaterina.tankova@devias.io',
        name: 'Nguyen Van A',
        phone: '304-428-3097',
        birthday: '1996/01/11'
    },
    description: ''
  }
  
  
];
