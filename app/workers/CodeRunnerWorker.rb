require 'sneakers'
puts "Including CodeRunnerWorker"
class CodeRunnerWorker
  include Sneakers::Worker
  from_queue 'rpc_queue'

  def work(msg)

    puts msg
    ack!
  end
end
