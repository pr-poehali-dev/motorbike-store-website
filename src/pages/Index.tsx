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
  engine: string;
  image: string;
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

  const motorcycles: Motorcycle[] = [
    {
      id: '1',
      name: 'ЖЕЛЕЗНЫЙ КОНЬ',
      price: 890000,
      category: 'Круизер',
      power: '107 л.с.',
      engine: '1690 см³',
      image: '/img/a10bc2e0-bd8c-4a47-afda-89a53027d3d4.jpg'
    },
    {
      id: '2', 
      name: 'ДОРОЖНЫЙ ВОИН',
      price: 1250000,
      category: 'Спорт',
      power: '200 л.с.',
      engine: '1000 см³',
      image: '/img/a10bc2e0-bd8c-4a47-afda-89a53027d3d4.jpg'
    },
    {
      id: '3',
      name: 'НОЧНОЙ ХИЩНИК',
      price: 750000,
      category: 'Нейкед',
      power: '95 л.с.',
      engine: '800 см³',
      image: '/img/a10bc2e0-bd8c-4a47-afda-89a53027d3d4.jpg'
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