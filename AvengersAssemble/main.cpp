#include <iostream>
#include <vector>
#include <string>

int main(int argc, char *argv[])
{
  std::vector<std::string> avengers(argv + 1, argv + argc);
  int numAvengers = avengers.size();

  if (numAvengers < 3)
  {
    std::cout << "Avengers, assemble!" << std::endl;
  }
  else if (numAvengers <= 5)
  {
    std::cout << "Earth's mightiest heroes, unite!" << std::endl;
  }
  else
  {
    std::cout << "Together, we are unstoppable!" << std::endl;
  }

  return 0;
}