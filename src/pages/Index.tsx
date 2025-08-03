import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Motorcycle {
  id: string;
  name: string;
  price: number;
  category: string;
  power: string;
  powerNum: number;
  engine: string;
  engineNum: number;
  image: string;
  maxSpeed: number;
  acceleration: number;
  weight: number;
  fuelTank: number;
  consumption: number;
  torque: number;
  gears: number;
  wheelbase: number;
}

interface ConfigOption {
  id: string;
  name: string;
  price: number;
  category: string;
}

const Index = () => {
  const [selectedBike, setSelectedBike] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCompare, setSelectedCompare] = useState<string[]>([]);

  const motorcycles: Motorcycle[] = [
    {
      id: '1',
      name: 'ЖЕЛЕЗНЫЙ КОНЬ',
      price: 890000,
      category: 'Круизер',
      power: '107 л.с.',
      powerNum: 107,
      engine: '1690 см³',
      engineNum: 1690,
      image: '/img/a10bc2e0-bd8c-4a47-afda-89a53027d3d4.jpg',
      maxSpeed: 180,
      acceleration: 4.2,
      weight: 320,
      fuelTank: 18.9,
      consumption: 6.5,
      torque: 155,
      gears: 6,
      wheelbase: 1625
    },
    {
      id: '2', 
      name: 'ДОРОЖНЫЙ ВОИН',
      price: 1250000,
      category: 'Спорт',
      power: '200 л.с.',
      powerNum: 200,
      engine: '1000 см³',
      engineNum: 1000,
      image: '/img/a10bc2e0-bd8c-4a47-afda-89a53027d3d4.jpg',
      maxSpeed: 299,
      acceleration: 2.9,
      weight: 195,
      fuelTank: 17,
      consumption: 7.2,
      torque: 114,
      gears: 6,
      wheelbase: 1440
    },
    {
      id: '3',
      name: 'НОЧНОЙ ХИЩНИК',
      price: 750000,
      category: 'Нейкед',
      power: '95 л.с.',
      powerNum: 95,
      engine: '800 см³',
      engineNum: 800,
      image: '/img/a10bc2e0-bd8c-4a47-afda-89a53027d3d4.jpg',
      maxSpeed: 220,
      acceleration: 3.8,
      weight: 210,
      fuelTank: 16,
      consumption: 5.8,
      torque: 87,
      gears: 6,
      wheelbase: 1410
    }
  ];

  const configOptions: ConfigOption[] = [
    { id: 'exhaust', name: 'Спортивный выхлоп', price: 45000, category: 'Производительность' },
    { id: 'wheels', name: 'Кованые диски', price: 80000, category: 'Внешний вид' },
    { id: 'seat', name: 'Кожаное седло', price: 25000, category: 'Комфорт' },
    { id: 'windshield', name: 'Ветровое стекло', price: 15000, category: 'Комфорт' },
    { id: 'led', name: 'LED освещение', price: 20000, category: 'Внешний вид' },
    { id: 'bags', name: 'Боковые кофры', price: 35000, category: 'Практичность' }
  ];

  const calculateTotalPrice = () => {
    const bikePrice = selectedBike ? motorcycles.find(m => m.id === selectedBike)?.price || 0 : 0;
    const optionsPrice = selectedOptions.reduce((total, optionId) => {
      const option = configOptions.find(o => o.id === optionId);
      return total + (option?.price || 0);
    }, 0);
    return bikePrice + optionsPrice;
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/a10bc2e0-bd8c-4a47-afda-89a53027d3d4.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Icon name="Bike" size={80} className="text-primary mr-4" />
            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-wider">
              MOTO
              <span className="text-primary">STORE</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            СВОБОДА НА ДВУХ КОЛЕСАХ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 text-lg">
              КАТАЛОГ МОТОЦИКЛОВ
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 text-lg">
              КОНФИГУРАТОР
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-primary" />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-white">СРАВНЕНИЕ ХАРАКТЕРИСТИК</h2>
            <p className="text-xl text-muted-foreground">Выберите до 3 мотоциклов для сравнения</p>
          </div>

          {/* Comparison Toggle */}
          <div className="text-center mb-12">
            <Button 
              onClick={() => setCompareMode(!compareMode)}
              className={`${compareMode ? 'bg-primary' : 'bg-secondary'} hover:bg-primary/90 text-white font-semibold px-8 py-3 text-lg`}
            >
              <Icon name="BarChart3" size={20} className="mr-2" />
              {compareMode ? 'ОТКЛЮЧИТЬ СРАВНЕНИЕ' : 'ВКЛЮЧИТЬ СРАВНЕНИЕ'}
            </Button>
          </div>

          {/* Comparison Grid */}
          {compareMode && (
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {motorcycles.map((bike) => (
                  <Card 
                    key={bike.id} 
                    className={`bg-card border-border cursor-pointer transition-all duration-300 ${
                      selectedCompare.includes(bike.id) ? 'border-primary bg-primary/10' : 'hover:border-primary/50'
                    }`}
                    onClick={() => {
                      if (selectedCompare.includes(bike.id)) {
                        setSelectedCompare(prev => prev.filter(id => id !== bike.id));
                      } else if (selectedCompare.length < 3) {
                        setSelectedCompare(prev => [...prev, bike.id]);
                      }
                    }}
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img src={bike.image} alt={bike.name} className="w-full h-full object-cover" />
                      {selectedCompare.includes(bike.id) && (
                        <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                          <Icon name="Check" size={16} className="text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-white text-lg mb-2">{bike.name}</h3>
                      <p className="text-muted-foreground">{bike.category}</p>
                      <p className="text-primary font-bold text-xl mt-2">
                        {bike.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Comparison Table */}
              {selectedCompare.length > 0 && (
                <Card className="bg-card border-border overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white flex items-center">
                      <Icon name="BarChart3" size={24} className="mr-2 text-primary" />
                      ДЕТАЛЬНОЕ СРАВНЕНИЕ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-secondary/50">
                          <tr>
                            <th className="text-left p-4 text-white font-semibold">Характеристика</th>
                            {selectedCompare.map(bikeId => {
                              const bike = motorcycles.find(m => m.id === bikeId);
                              return (
                                <th key={bikeId} className="text-center p-4 text-white font-semibold min-w-[200px]">
                                  {bike?.name}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="p-4 text-muted-foreground font-semibold">Категория</td>
                            {selectedCompare.map(bikeId => {
                              const bike = motorcycles.find(m => m.id === bikeId);
                              return (
                                <td key={bikeId} className="p-4 text-center text-white">
                                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                                    {bike?.category}
                                  </Badge>
                                </td>
                              );
                            })}
                          </tr>
                          
                          <tr className="border-b border-border">
                            <td className="p-4 text-muted-foreground font-semibold">Мощность</td>
                            {selectedCompare.map(bikeId => {
                              const bike = motorcycles.find(m => m.id === bikeId);
                              const maxPower = Math.max(...selectedCompare.map(id => motorcycles.find(m => m.id === id)?.powerNum || 0));
                              const isMax = bike?.powerNum === maxPower;
                              return (
                                <td key={bikeId} className={`p-4 text-center font-semibold ${isMax ? 'text-primary' : 'text-white'}`}>
                                  {bike?.power}
                                  {isMax && <Icon name="Crown" size={16} className="inline ml-1 text-primary" />}
                                </td>
                              );
                            })}
                          </tr>

                          <tr className="border-b border-border">
                            <td className="p-4 text-muted-foreground font-semibold">Объем двигателя</td>
                            {selectedCompare.map(bikeId => {
                              const bike = motorcycles.find(m => m.id === bikeId);
                              const maxEngine = Math.max(...selectedCompare.map(id => motorcycles.find(m => m.id === id)?.engineNum || 0));
                              const isMax = bike?.engineNum === maxEngine;
                              return (
                                <td key={bikeId} className={`p-4 text-center font-semibold ${isMax ? 'text-primary' : 'text-white'}`}>
                                  {bike?.engine}
                                  {isMax && <Icon name="Crown" size={16} className="inline ml-1 text-primary" />}
                                </td>
                              );
                            })}
                          </tr>

                          <tr className="border-b border-border">
                            <td className="p-4 text-muted-foreground font-semibold">Максимальная скорость</td>
                            {selectedCompare.map(bikeId => {
                              const bike = motorcycles.find(m => m.id === bikeId);
                              const maxSpeed = Math.max(...selectedCompare.map(id => motorcycles.find(m => m.id === id)?.maxSpeed || 0));
                              const isMax = bike?.maxSpeed === maxSpeed;
                              return (
                                <td key={bikeId} className={`p-4 text-center font-semibold ${isMax ? 'text-primary' : 'text-white'}`}>
                                  {bike?.maxSpeed} км/ч
                                  {isMax && <Icon name="Crown" size={16} className="inline ml-1 text-primary" />}
                                </td>
                              );
                            })}
                          </tr>

                          <tr className="border-b border-border">
                            <td className="p-4 text-muted-foreground font-semibold">Разгон 0-100 км/ч</td>
                            {selectedCompare.map(bikeId => {
                              const bike = motorcycles.find(m => m.id === bikeId);
                              const minAccel = Math.min(...selectedCompare.map(id => motorcycles.find(m => m.id === id)?.acceleration || 999));
                              const isMin = bike?.acceleration === minAccel;
                              return (
                                <td key={bikeId} className={`p-4 text-center font-semibold ${isMin ? 'text-primary' : 'text-white'}`}>
                                  {bike?.acceleration} сек
                                  {isMin && <Icon name="Crown" size={16} className="inline ml-1 text-primary" />}
                                </td>
                              );
                            })}
                          </tr>

                          <tr className="border-b border-border">
                            <td className="p-4 text-muted-foreground font-semibold">Вес</td>
                            {selectedCompare.map(bikeId => {
                              const bike = motorcycles.find(m => m.id === bikeId);
                              const minWeight = Math.min(...selectedCompare.map(id => motorcycles.find(m => m.id === id)?.weight || 999));
                              const isMin = bike?.weight === minWeight;
                              return (
                                <td key={bikeId} className={`p-4 text-center font-semibold ${isMin ? 'text-primary' : 'text-white'}`}>
                                  {bike?.weight} кг
                                  {isMin && <Icon name="Crown" size={16} className="inline ml-1 text-primary" />}
                                </td>
                              );
                            })}
                          </tr>

                          <tr className="border-b border-border">
                            <td className="p-4 text-muted-foreground font-semibold">Объем топливного бака</td>
                            {selectedCompare.map(bikeId => {
                              const bike = motorcycles.find(m => m.id === bikeId);
                              return (
                                <td key={bikeId} className="p-4 text-center text-white font-semibold">
                                  {bike?.fuelTank} л
                                </td>
                              );
                            })}
                          </tr>

                          <tr className="border-b border-border">
                            <td className="p-4 text-muted-foreground font-semibold">Расход топлива</td>
                            {selectedCompare.map(bikeId => {
                              const bike = motorcycles.find(m => m.id === bikeId);
                              const minConsumption = Math.min(...selectedCompare.map(id => motorcycles.find(m => m.id === id)?.consumption || 999));
                              const isMin = bike?.consumption === minConsumption;
                              return (
                                <td key={bikeId} className={`p-4 text-center font-semibold ${isMin ? 'text-primary' : 'text-white'}`}>
                                  {bike?.consumption} л/100км
                                  {isMin && <Icon name="Crown" size={16} className="inline ml-1 text-primary" />}
                                </td>
                              );
                            })}
                          </tr>

                          <tr className="border-b border-border">
                            <td className="p-4 text-muted-foreground font-semibold">Крутящий момент</td>
                            {selectedCompare.map(bikeId => {
                              const bike = motorcycles.find(m => m.id === bikeId);
                              const maxTorque = Math.max(...selectedCompare.map(id => motorcycles.find(m => m.id === id)?.torque || 0));
                              const isMax = bike?.torque === maxTorque;
                              return (
                                <td key={bikeId} className={`p-4 text-center font-semibold ${isMax ? 'text-primary' : 'text-white'}`}>
                                  {bike?.torque} Нм
                                  {isMax && <Icon name="Crown" size={16} className="inline ml-1 text-primary" />}
                                </td>
                              );
                            })}
                          </tr>

                          <tr className="border-b border-border">
                            <td className="p-4 text-muted-foreground font-semibold">Цена</td>
                            {selectedCompare.map(bikeId => {
                              const bike = motorcycles.find(m => m.id === bikeId);
                              const minPrice = Math.min(...selectedCompare.map(id => motorcycles.find(m => m.id === id)?.price || 999999));
                              const isMin = bike?.price === minPrice;
                              return (
                                <td key={bikeId} className={`p-4 text-center font-bold text-xl ${isMin ? 'text-primary' : 'text-white'}`}>
                                  {bike?.price.toLocaleString('ru-RU')} ₽
                                  {isMin && <Icon name="Crown" size={16} className="inline ml-1 text-primary" />}
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-white">О НАШЕЙ КОМПАНИИ</h2>
            <p className="text-xl text-muted-foreground">25 лет на дороге свободы</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Company Story */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white flex items-center">
                  <Icon name="History" size={32} className="mr-3 text-primary" />
                  НАША ИСТОРИЯ
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  В 1998 году группа байкеров-энтузиастов основала MOTOSTORE с простой целью — 
                  сделать мотоциклы доступными для каждого, кто мечтает о свободе на двух колесах.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  За четверть века мы выросли от небольшого гаража до крупнейшей сети 
                  мотосалонов в России, сохранив при этом дух настоящего байкерского братства.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white flex items-center">
                  <Icon name="Target" size={32} className="mr-3 text-primary" />
                  НАША МИССИЯ
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Мы верим, что каждый заслуживает почувствовать адреналин и свободу, 
                  которые дает мотоцикл. Наша миссия — помочь вам найти идеальную машину 
                  и стать частью большой байкерской семьи.
                </p>
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                  <Icon name="Shield" size={24} className="text-primary mb-2" />
                  <h4 className="font-bold text-white mb-2">КАЧЕСТВО</h4>
                  <p className="text-muted-foreground text-sm">Только проверенные бренды и сертифицированная техника</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                  <Icon name="Users" size={24} className="text-primary mb-2" />
                  <h4 className="font-bold text-white mb-2">СООБЩЕСТВО</h4>
                  <p className="text-muted-foreground text-sm">Объединяем байкеров и создаем дружное комьюнити</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                  <Icon name="Wrench" size={24} className="text-primary mb-2" />
                  <h4 className="font-bold text-white mb-2">СЕРВИС</h4>
                  <p className="text-muted-foreground text-sm">Профессиональное обслуживание и поддержка 24/7</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                  <Icon name="Heart" size={24} className="text-primary mb-2" />
                  <h4 className="font-bold text-white mb-2">СТРАСТЬ</h4>
                  <p className="text-muted-foreground text-sm">Любим то, что делаем, и делимся этой страстью с вами</p>
                </div>
              </div>
            </div>

            {/* Workshop Image */}
            <div className="space-y-6">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img 
                  src="/img/f87f0b5f-ca65-45ac-ac0a-119aa069dfaf.jpg" 
                  alt="Наша мастерская"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-bold mb-2">НАША МАСТЕРСКАЯ</h4>
                  <p className="text-lg">Профессиональное оборудование и опытные мастера</p>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-card border border-border rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">15000+</div>
                  <div className="text-white font-semibold">ДОВОЛЬНЫХ КЛИЕНТОВ</div>
                </div>
                <div className="text-center p-6 bg-card border border-border rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">25</div>
                  <div className="text-white font-semibold">ЛЕТ НА РЫНКЕ</div>
                </div>
                <div className="text-center p-6 bg-card border border-border rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-white font-semibold">МОДЕЛЕЙ В НАЛИЧИИ</div>
                </div>
                <div className="text-center p-6 bg-card border border-border rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">12</div>
                  <div className="text-white font-semibold">ФИЛИАЛОВ ПО РОССИИ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-white">НАША КОМАНДА</h3>
            <p className="text-xl text-muted-foreground">Профессионалы с байкерской душой</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { name: 'АЛЕКСЕЙ ВОЛКОВ', role: 'Основатель и CEO', experience: '25 лет опыта', description: 'Байкер с 1995 года, прошел более 500,000 км' },
              { name: 'МИХАИЛ КРЮКОВ', role: 'Главный механик', experience: '18 лет опыта', description: 'Сертифицированный мастер по ремонту мотоциклов' },
              { name: 'ЕЛЕНА СТАЛЬНАЯ', role: 'Менеджер по продажам', experience: '12 лет опыта', description: 'Поможет подобрать идеальный мотоцикл для вас' }
            ].map((member, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/img/5cdb75b6-12b0-4fa3-8e86-f4e82640f3c1.jpg" 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                  <p className="text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-3">{member.experience}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certificates & Awards */}
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-white">НАГРАДЫ И СЕРТИФИКАТЫ</h3>
            <p className="text-xl text-muted-foreground">Признание нашего профессионализма</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'ЛУЧШИЙ ДИЛЕР ГОДА', year: '2023', org: 'YAMAHA' },
              { title: 'ПРЕМИЯ КАЧЕСТВА', year: '2022', org: 'HONDA' },
              { title: 'СЕРТИФИКАТ ISO 9001', year: '2021', org: 'МЕЖДУНАРОДНЫЙ' },
              { title: 'БАЙКЕР ГОДА', year: '2020', org: 'MOTO.RU' }
            ].map((award, index) => (
              <div key={index} className="text-center p-6 bg-secondary/30 rounded-lg border border-border hover:border-primary transition-all duration-300">
                <Icon name="Award" size={48} className="text-primary mx-auto mb-3" />
                <h4 className="font-bold text-white text-sm mb-2">{award.title}</h4>
                <p className="text-primary font-semibold text-lg">{award.year}</p>
                <p className="text-muted-foreground text-xs">{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-white">КАТАЛОГ МОТОЦИКЛОВ</h2>
            <p className="text-xl text-muted-foreground">Выберите своего железного коня</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {motorcycles.map((bike) => (
              <Card key={bike.id} className="bg-card border-border hover:border-primary transition-all duration-300 group overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={bike.image} 
                    alt={bike.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-primary text-white">
                      {bike.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">{bike.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Мощность:</span>
                      <span className="text-white font-semibold">{bike.power}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Объем:</span>
                      <span className="text-white font-semibold">{bike.engine}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Макс. скорость:</span>
                      <span className="text-white font-semibold">{bike.maxSpeed} км/ч</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Вес:</span>
                      <span className="text-white font-semibold">{bike.weight} кг</span>
                    </div>
                    <Separator className="bg-border" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">Цена:</span>
                      <span className="text-2xl font-bold text-primary">
                        {bike.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    ВЫБРАТЬ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-white">КОНФИГУРАТОР МОТОЦИКЛОВ</h2>
            <p className="text-xl text-muted-foreground">Создайте уникальный мотоцикл под себя</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Icon name="Bike" size={24} className="mr-2 text-primary" />
                    Выберите базовую модель
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedBike} onValueChange={setSelectedBike}>
                    <SelectTrigger className="bg-background border-border text-white">
                      <SelectValue placeholder="Выберите мотоцикл" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      {motorcycles.map((bike) => (
                        <SelectItem key={bike.id} value={bike.id} className="text-white hover:bg-muted">
                          {bike.name} - {bike.price.toLocaleString('ru-RU')} ₽
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Icon name="Settings" size={24} className="mr-2 text-primary" />
                    Дополнительные опции
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {configOptions.map((option) => (
                    <div 
                      key={option.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedOptions.includes(option.id) 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => toggleOption(option.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-white">{option.name}</h4>
                          <p className="text-sm text-muted-foreground">{option.category}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-primary font-bold">
                            +{option.price.toLocaleString('ru-RU')} ₽
                          </span>
                          {selectedOptions.includes(option.id) && (
                            <Icon name="Check" size={16} className="text-primary ml-2 inline" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Price Summary */}
            <div className="space-y-6">
              {/* Performance Chart */}
              {selectedBike && (
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center">
                      <Icon name="BarChart3" size={24} className="mr-2 text-primary" />
                      График производительности
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const bike = motorcycles.find(m => m.id === selectedBike);
                      if (!bike) return null;
                      
                      const maxValues = {
                        power: Math.max(...motorcycles.map(m => m.powerNum)),
                        speed: Math.max(...motorcycles.map(m => m.maxSpeed)),
                        torque: Math.max(...motorcycles.map(m => m.torque)),
                        efficiency: Math.max(...motorcycles.map(m => 10 - m.consumption))
                      };
                      
                      const metrics = [
                        { name: 'Мощность', value: bike.powerNum, max: maxValues.power, unit: 'л.с.' },
                        { name: 'Скорость', value: bike.maxSpeed, max: maxValues.speed, unit: 'км/ч' },
                        { name: 'Момент', value: bike.torque, max: maxValues.torque, unit: 'Нм' },
                        { name: 'Эффективность', value: 10 - bike.consumption, max: maxValues.efficiency, unit: '/10' }
                      ];
                      
                      return (
                        <div className="space-y-4">
                          {metrics.map((metric) => {
                            const percentage = (metric.value / metric.max) * 100;
                            return (
                              <div key={metric.name} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-white font-medium">{metric.name}</span>
                                  <span className="text-primary font-bold">
                                    {metric.value} {metric.unit}
                                  </span>
                                </div>
                                <div className="w-full bg-secondary/30 rounded-full h-3">
                                  <div 
                                    className="bg-gradient-to-r from-primary to-orange-500 h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Icon name="Calculator" size={24} className="mr-2 text-primary" />
                    Итоговая стоимость
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedBike && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Базовая модель:</span>
                        <span className="text-white font-semibold">
                          {motorcycles.find(m => m.id === selectedBike)?.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      
                      {selectedOptions.length > 0 && (
                        <>
                          <Separator className="bg-border" />
                          <div className="space-y-2">
                            <h4 className="text-white font-semibold">Опции:</h4>
                            {selectedOptions.map(optionId => {
                              const option = configOptions.find(o => o.id === optionId);
                              return option ? (
                                <div key={optionId} className="flex justify-between items-center text-sm">
                                  <span className="text-muted-foreground">{option.name}</span>
                                  <span className="text-white">+{option.price.toLocaleString('ru-RU')} ₽</span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </>
                      )}
                      
                      <Separator className="bg-border" />
                      <div className="flex justify-between items-center text-xl">
                        <span className="font-bold text-white">ИТОГО:</span>
                        <span className="font-bold text-primary text-2xl">
                          {calculateTotalPrice().toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold mt-6">
                        <Icon name="CreditCard" size={16} className="mr-2" />
                        ОФОРМИТЬ ЗАКАЗ
                      </Button>
                    </div>
                  )}
                  
                  {!selectedBike && (
                    <div className="text-center py-8">
                      <Icon name="Bike" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Выберите мотоцикл для расчета стоимости</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preview Image */}
              {selectedBike && (
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Ваш мотоцикл</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img 
                      src="/img/cfb2e616-c8e2-45ff-901b-6923673ad2f7.jpg" 
                      alt="Configured motorcycle"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-border py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Icon name="Bike" size={40} className="text-primary mr-3" />
            <h3 className="text-3xl font-bold text-white">MOTO<span className="text-primary">STORE</span></h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Ваш надежный партнер в мире мотоциклов
          </p>
          <div className="flex justify-center space-x-6 text-muted-foreground">
            <span>📞 +7 (999) 123-45-67</span>
            <span>📧 info@motostore.ru</span>
            <span>📍 Москва, ул. Байкерская, 1</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;