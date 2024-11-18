
import google from '../image/Google+Play+Badge_en.svg'
import appstore from '../image/App+Store+Badge_en.svg'
import hewai from '../image/Huawei+Store+Badge_en.svg'
export default function Footer() {
    return (
      <footer className="bg-white text-gray-700 py-8">
        {/* Links Section */}
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-5 md:grid-cols-5 gap-4 md:gap-8">
            {/* Column 1 */}
            <div>
              <h4 className="font-bold text-lg mb-4">Football</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">First Team</a></li>
                <li><a href="#" className="hover:underline">Academy</a></li>
                <li><a href="#" className="hover:underline">Women&lsquo;s Team</a></li>
              </ul>
            </div>
  
            {/* Column 2 */}
            <div>
              <h4 className="font-bold text-lg mb-4">Basketball</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Basketball First Team</a></li>
              </ul>
            </div>
  
            {/* Column 3 */}
            <div>
              <h4 className="font-bold text-lg mb-4">The Club</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Schedule</a></li>
                <li><a href="#" className="hover:underline">Transparency and Sustainability</a></li>
                <li><a href="#" className="hover:underline">Sponsors</a></li>
                <li><a href="#" className="hover:underline">Values</a></li>
                <li><a href="#" className="hover:underline">Honors</a></li>
                <li><a href="#" className="hover:underline">History</a></li>
                <li><a href="#" className="hover:underline">Fan Clubs</a></li>
                <li><a href="#" className="hover:underline">Bernabéu Stadium</a></li>
                <li><a href="#" className="hover:underline">Real Madrid City</a></li>
                <li><a href="#" className="hover:underline">WiZink Center</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
  
            {/* Column 4 */}
            <div>
              <h4 className="font-bold text-lg mb-4">Bernabéu Stadium</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">RMTV Live</a></li>
                <li><a href="#" className="hover:underline">News</a></li>
                <li><a href="#" className="hover:underline">Foundation Real Madrid</a></li>
                <li><a href="#" className="hover:underline">RM Next</a></li>
                <li><a href="#" className="hover:underline">RM Graduate School</a></li>
              </ul>
            </div>
  
            {/* Column 5 */}
            <div>
              <h4 className="font-bold text-lg mb-4">Madridistas</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Hospitality</a></li>
                <li><a href="#" className="hover:underline">Shop</a></li>
                <li><a href="#" className="hover:underline">Tour</a></li>
                <li><a href="#" className="hover:underline">Tickets</a></li>
                <li><a href="#" className="hover:underline">RM Play</a></li>
              </ul>
            </div>
          </div>
        </div>
  
        {/* Download Section */}
        <div className="mt-8 border-t border-gray-300">
          <div className="container mx-auto px-6 lg:px-16 py-6 text-center">
            <p className="text-gray-600 mb-4">Download Now</p>
            <div className="flex justify-center space-x-4">
              <img src={google} alt="Google Play" className="h-12" />
              <img src={appstore} alt="App Store" className="h-12" />
              <img src={hewai} alt="Huawei AppGallery" className="h-12" />
            </div>
          </div>
        </div>
      </footer>
    );
  }
  